import { Request } from "express";
import {
  checkIfSlotAvailable,
  checkSlotBoundary,
  createEvent,
  filterFreeSlots,
  findSlotsInUTC,
  getEventsFromDateRange,
  transformEventDoc,
  transformEventsToTimezone,
} from "../methods/event.method";
import { BadRequestError, ExistingEventError } from "../helpers/routeExecutor";
import config from "../helpers/config";
import {
  validateBookEventRequest,
  validateGetRequests,
} from "../helpers/validators";

export const getEvents = async (req: Request) => {
  const { startDate, endDate, timezone } = req.query;
  validateGetRequests(startDate as string);
  const parsedTimeZone = (timezone as string) || config.eventConfig.timezone;
  const { eventDocs } = await getEventsFromDateRange(
    startDate as string,
    endDate as string,
    parsedTimeZone
  );
  const events = transformEventDoc(eventDocs);
  const transformedEvents = transformEventsToTimezone(events, parsedTimeZone);
  return transformedEvents;
};

export const getFreeEvents = async (req: Request) => {
  const { startDate, endDate, duration, timezone } = req.query;
  validateGetRequests(startDate as string);
  const parsedTimeZone = (timezone as string) || config.eventConfig.timezone;
  const eventDuration = Number(duration || config.eventConfig.duration);
  const { preparedStartDate, preparedEndDate, eventDocs } =
    await getEventsFromDateRange(
      startDate as string,
      endDate as string,
      parsedTimeZone
    );
  const slotsInUTC = findSlotsInUTC(
    preparedStartDate,
    preparedEndDate,
    eventDuration,
    parsedTimeZone
  );
  const events = transformEventDoc(eventDocs);
  const freeSlots = filterFreeSlots(
    slotsInUTC,
    events,
    preparedStartDate,
    preparedEndDate
  );
  const transformedEvents = transformEventsToTimezone(
    freeSlots,
    parsedTimeZone
  );
  return transformedEvents;
};

export const bookEvent = async (req: Request) => {
  const { startDate, endDate, timezone, eventData } = req.body;
  validateBookEventRequest(startDate as string, endDate as string);
  const parsedTimeZone = (timezone as string) || config.eventConfig.timezone;
  const { preparedStartDate, preparedEndDate, eventDocs } =
    await getEventsFromDateRange(
      startDate as string,
      endDate as string,
      parsedTimeZone
    );
  const validSlotBoundary = checkSlotBoundary(
    preparedStartDate,
    preparedEndDate
  );
  if (validSlotBoundary) {
    const events = transformEventDoc(eventDocs);
    const isSlotAvailable = checkIfSlotAvailable(
      events,
      preparedStartDate,
      preparedEndDate
    );
    if (isSlotAvailable) {
      await createEvent(preparedStartDate, preparedEndDate, eventData);
      return "Event Created Successfully";
    }
  }
  throw new ExistingEventError("Slot is not available");
};
