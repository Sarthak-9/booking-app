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
import moment from "moment-timezone";
import { EventDoc, Event, Slots } from "../types/event.types";

const parseTime = (date: Date, timeString: string): Date => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  date.setHours(hours, minutes, seconds, 0);
  return date;
};

export const prepareEndDateFromStartDate = (startDate: Date): Date => {
  const { endHour } = config.eventConfig;
  const endDate = parseTime(startDate, endHour);
  return endDate;
};

export const convertDateToUTC = (date: string, timezone: string): Date => {
  const utcDate = moment.tz(date, timezone).utc().toDate();
  return utcDate;
};

export const convertUTCToTimezone = (utcDate: Date, timezone: string): Date => {
  const localDate = moment(utcDate).tz(timezone).toDate();
  return localDate;
};

export const prepareEventDates = (
  startDate: string,
  endDate: string | null,
  timeZone: string
) => {
  const preparedStartDate = convertDateToUTC(startDate, timeZone);
  let preparedEndDate;
  if (endDate) {
    preparedEndDate = convertDateToUTC(endDate, timeZone);
  } else {
    preparedEndDate = prepareEndDateFromStartDate(preparedStartDate);
  }
  return { preparedStartDate, preparedEndDate };
};

export const generateSlots = (start: Date) => {
  const { startHour, endHour, duration } = config.eventConfig;
  const events = [];

  let currentStart = parseTime(start, startHour);
  let endLimit = parseTime(start, endHour);

  while (currentStart < endLimit) {
    const slotStart = new Date(currentStart);
    const slotEnd = new Date(slotStart);
    slotEnd.setMinutes(slotStart.getMinutes() + duration);

    if (slotEnd > endLimit) {
      break;
    }

    events.push({ startDate: slotStart, endDate: slotEnd });
    currentStart = new Date(slotEnd);
  }

  return events;
};

export const prepareQueryForEvents = (startDate: Date, endDate: Date) => {
  const queryConstraints: QueryConstraint[] = [];
  if (startDate) {
    queryConstraints.push(where("startDate", ">=", new Date(startDate)));
  }
  if (endDate) {
    queryConstraints.push(where("endDate", "<=", new Date(endDate)));
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
  timeZone: string
) => {
  const { preparedStartDate, preparedEndDate } = prepareEventDates(
    startDate,
    endDate,
    timeZone
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
  return events.every(
    (event) =>
      (event.startDate >= startDate && event.endDate >= endDate) ||
      (event.startDate <= startDate && event.endDate <= endDate)
  );
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

export const filterFreeSlots = (allEvents: Slots[], dateEvents: Event[]) => {
  return allEvents.filter((slot) => {
    return !dateEvents.some(
      (event) =>
        event.startDate < slot.endDate && event.endDate > slot.startDate
    );
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
