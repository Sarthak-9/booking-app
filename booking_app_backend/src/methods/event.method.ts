import config from "../helpers/config";
import {
  addDoc,
  collection,
  getDocs,
  query,
  QueryConstraint,
  where,
} from "firebase/firestore";
import { db } from "../helpers/firebase";
import { EventDoc, Event, Slots } from "../types/event.types";
import {
  convertDateToUTC,
  prepareEndDateFromStartDate,
  parseTime,
  getFullDateWithoutTime,
  convertUTCToTimezone,
  formatDateToLocalISOString,
  convertUTCDateStringToTimezone,
} from "../helpers/date";
import e from "express";
import moment from "moment";

export const prepareEventDates = (
  startDate: string,
  endDate: string | null,
  timezone: string = config.eventConfig.timezone
) => {
  const preparedStartDate = convertDateToUTC(startDate, timezone);
  let preparedEndDate;
  if (endDate) {
    preparedEndDate = convertDateToUTC(endDate, timezone);
  } else {
    preparedEndDate = prepareEndDateFromStartDate(preparedStartDate);
  }
  return { preparedStartDate, preparedEndDate };
};

export const generateSlotsForDay = (start: Date, eventDuration: number) => {
  const { startHour, endHour, duration } = config.eventConfig;
  const events = [];
  let currentStart = parseTime(start, startHour);
  let endLimit = parseTime(start, endHour);
  endLimit.setMinutes(endLimit.getMinutes() + duration);
  while (currentStart < endLimit) {
    const slotStart = new Date(currentStart);
    const slotEnd = new Date(currentStart);
    slotEnd.setMinutes(slotEnd.getMinutes() + eventDuration);
    const nextSlotStart = new Date(slotStart);
    nextSlotStart.setMinutes(slotStart.getMinutes() + duration);
    if (nextSlotStart > endLimit) {
      break;
    }
    if (slotEnd <= endLimit) {
      events.push({ startDate: slotStart, endDate: slotEnd });
    }
    currentStart = new Date(nextSlotStart);
  }
  return events;
};

export const findSlotDates = (
  start: Date,
  end: Date,
  eventDuration: number
) => {
  let slots = [];
  const startDate = getFullDateWithoutTime(start).toISOString();
  const endDate = getFullDateWithoutTime(end).toISOString();
  if (startDate === endDate) {
    slots = generateSlotsForDay(start, eventDuration);
  } else {
    slots = generateSlotsForDay(start, eventDuration);
    slots = slots.concat(generateSlotsForDay(end, eventDuration));
  }
  return slots;
};

export const filterSlots = (start: Date, end: Date, slots: Slots[]) => {
  const filteredSlots = slots.filter(
    (slot) => slot.startDate >= start && slot.endDate <= end
  );
  return filteredSlots;
};

export const generateSlots = (
  start: Date,
  end: Date,
  eventDuration: number
) => {
  const slots = findSlotDates(start, end, eventDuration);
  const filteredSlots = filterSlots(start, end, slots);
  return filteredSlots;
};

export const prepareQueryForEvents = (startDate: Date, endDate: Date) => {
  const queryConstraints: QueryConstraint[] = [];
  if (startDate) {
    const preparedStartDate = new Date(startDate);
    preparedStartDate.setDate(preparedStartDate.getDate() - 1);
    queryConstraints.push(where("startDate", ">=", preparedStartDate));
  }
  if (endDate) {
    const preparedEndDate = new Date(endDate);
    preparedEndDate.setDate(preparedEndDate.getDate() + 1);
    queryConstraints.push(where("endDate", "<=", preparedEndDate));
  }
  return queryConstraints;
};

export const getStoredEventsForDate = async (
  queryConstraints: QueryConstraint[]
) => {
  const eventsCollection = collection(db, config.collections.events);
  const q = query(eventsCollection, ...queryConstraints);
  const querySnapshot = await getDocs(q);
  const eventDocs = querySnapshot.docs.map((doc) => doc.data());
  return eventDocs as EventDoc[];
};

export const getEventsFromDateRange = async (
  startDate: string,
  endDate: string,
  timezone: string
) => {
  const { preparedStartDate, preparedEndDate } = prepareEventDates(
    startDate,
    endDate,
    timezone
  );
  const preparedQueryForEvents = prepareQueryForEvents(
    preparedStartDate,
    preparedEndDate
  );
  const eventDocs = await getStoredEventsForDate(preparedQueryForEvents);
  return { preparedStartDate, preparedEndDate, eventDocs };
};

export const createEvent = async (
  startDate: Date,
  endDate: Date,
  eventData: Record<string, string>
) => {
  const event = { startDate, endDate, eventData };
  const createdEvent = await addDoc(
    collection(db, config.collections.events),
    event
  );
  return createdEvent;
};

export const checkIfSlotAvailable = (
  events: Event[],
  startDate: Date,
  endDate: Date
) => {
  for (const event of events) {
    if (startDate < event.endDate && endDate > event.startDate) {
      return false;
    }
  }
  return true;
};

export const transformEventDoc = (events: EventDoc[]): Event[] => {
  return events.map((event) => {
    return {
      ...event,
      startDate: new Date(event.startDate.seconds * 1000),
      endDate: new Date(event.endDate.seconds * 1000),
    };
  });
};

export const filterFreeSlots = (
  slots: Slots[],
  events: Event[],
  startDate: Date,
  endDate: Date
) => {
  const filteredSlots = slots.filter((slot) => {
    return !events.some(
      (event) =>
        event.startDate < slot.endDate && event.endDate > slot.startDate
    );
  });
  return filteredSlots;
};

export const convertSlotsToTimezone = (slots: Slots[], timezone: string) => {
  return slots.map((slot) => {
    return {
      startDate: convertUTCToTimezone(new Date(slot.startDate), timezone),
      endDate: convertUTCToTimezone(new Date(slot.endDate), timezone),
    };
  });
};

export const transformEventsToTimezone = (
  events: Event[] | Slots[],
  timezone: string
) => {
  return events.map((event) => {
    const transformedEvent = {
      startDate: convertUTCToTimezone(event.startDate, timezone),
      endDate: convertUTCToTimezone(event.endDate, timezone),
    };
    if ("eventData" in event) {
      return { ...transformedEvent, eventData: event.eventData };
    }
    return transformedEvent;
  });
};

export const convertSlotsToUTC = (slots: Slots[], timezone: string) => {
  return slots.map((slot) => {
    return {
      startDate: convertDateToUTC(
        formatDateToLocalISOString(slot.startDate),
        timezone
      ),
      endDate: convertDateToUTC(
        formatDateToLocalISOString(slot.endDate),
        timezone
      ),
    };
  });
};

export const findSlotsInUTC = (
  preparedStartDate: Date,
  preparedEndDate: Date,
  eventDuration: number,
  timezone: string
) => {
  const startDateToAdminTimezone = convertUTCToTimezone(
    preparedStartDate,
    config.eventConfig.timezone
  );
  const endDateToAdminTimezone = convertUTCToTimezone(
    preparedEndDate,
    config.eventConfig.timezone
  );

  const slots = generateSlots(
    startDateToAdminTimezone,
    endDateToAdminTimezone,
    eventDuration
  );
  const slotsInUTC = convertSlotsToUTC(slots, config.eventConfig.timezone);
  return slotsInUTC;
};

export const checkSlotBoundary = (
  preparedStartDate: Date,
  preparedEndDate: Date
) => {
  const { startHour, endHour, duration } = config.eventConfig;

  const startDateToAdminTimezone = convertUTCToTimezone(
    preparedStartDate,
    config.eventConfig.timezone
  );

  const endDateToAdminTimezone = convertUTCToTimezone(
    preparedEndDate,
    config.eventConfig.timezone
  );
  let startLimit = parseTime(startDateToAdminTimezone, startHour);
  let endLimit = parseTime(endDateToAdminTimezone, endHour);
  endLimit.setMinutes(endLimit.getMinutes() + duration);
  if (
    startDateToAdminTimezone >= startLimit &&
    endDateToAdminTimezone <= endLimit
  )
    return true;
  else {
    return false;
  }
};
