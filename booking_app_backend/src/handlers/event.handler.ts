import { Request, Response } from "express";
import {
  checkIfSlotAvailable,
  createEvent,
  filterFreeSlots,
  generateSlots,
  getEventsFromDateRange,
  transformEventDoc,
  transformEventsToTimezone,
} from "../methods/event.method";
import { BadRequestError, ExistingEventError } from "../helpers/routeExecutor";

export const getEvents = async (req: Request) => {
  const { startDate, endDate, timeZone } = req.query;
  if (!startDate) {
    throw new BadRequestError("Start Date is required");
  }
  const { eventDocs } = await getEventsFromDateRange(
    startDate as string,
    endDate as string,
    timeZone as string
  );
  const events = transformEventDoc(eventDocs);
  const transformedEvents = transformEventsToTimezone(
    events,
    timeZone as string
  );
  return transformedEvents;
};

export const getFreeEvents = async (req: Request) => {
  const { startDate, endDate, timeZone } = req.query;
  if (!startDate) {
    throw new BadRequestError("Start Date is required");
  }
  const { preparedStartDate, eventDocs } = await getEventsFromDateRange(
    startDate as string,
    endDate as string,
    timeZone as string
  );
  const slots = generateSlots(preparedStartDate);
  const events = transformEventDoc(eventDocs);
  const freeSlots = filterFreeSlots(slots, events);
  const transformedEvents = transformEventsToTimezone(
    freeSlots,
    timeZone as string
  );
  return transformedEvents;
};

export const bookEvent = async (req: Request) => {
  const { startDate, endDate, timeZone, eventData } = req.body;
  if (!startDate) {
    throw new BadRequestError("Start Date is required");
  }
  if (!endDate) {
    throw new BadRequestError("End Date is required");
  }
  const { preparedStartDate, preparedEndDate, eventDocs } =
    await getEventsFromDateRange(
      startDate as string,
      endDate as string,
      timeZone as string
    );
  const events = transformEventDoc(eventDocs);
  const isSlotAvailable = checkIfSlotAvailable(
    events,
    preparedStartDate,
    preparedEndDate
  );
  if (isSlotAvailable) {
    const createdEvent = await createEvent(
      preparedStartDate,
      preparedEndDate,
      eventData
    );
    return createdEvent;
  } else {
    throw new ExistingEventError("Slot is not available");
  }
};
