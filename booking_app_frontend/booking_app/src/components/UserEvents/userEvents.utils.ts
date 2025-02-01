import axios from "axios";
import { Event, EventDoc } from "../../types/event.types";
import {
  formatDateToLocalISOString,
  parseLocalDate,
} from "../../helpers/date.utils";
import { CONFIGS } from "../../configs/configs";

const transformEvents = (events: EventDoc[]): Event[] => {
  return events.map((event) => ({
    ...event,
    startDate: parseLocalDate(event.startDate),
    endDate: parseLocalDate(event.endDate),
  }));
};

export const fetchEvents = async (
  startDate: string,
  endDate: string,
  timezone: string
) => {
  try {
    const response = await axios.get(
      `${CONFIGS.API_URL}/event/events?startDate=${startDate}&endDate=${endDate}&timezone=${timezone}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getEvents = async (
  startDate: Date,
  endDate: Date,
  timezone: string
) => {
  const prepStartDate = formatDateToLocalISOString(startDate);
  endDate.setHours(23, 59, 59, 999);
  const preparedEndDate = formatDateToLocalISOString(endDate);
  const events = await fetchEvents(prepStartDate, preparedEndDate, timezone);
  const transformedEvents = transformEvents(events);
  return transformedEvents;
};
