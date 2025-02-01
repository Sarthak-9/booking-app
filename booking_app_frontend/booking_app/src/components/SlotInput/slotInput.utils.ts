import axios from "axios";
import { Slot, SlotDoc } from "../../types";
const SLOTS = [
  {
    startDate: new Date("2025-01-14T10:00:00"),
    endDate: new Date("2025-01-14T10:30:00"),
  },
  {
    startDate: new Date("2025-01-14T12:00:00"),
    endDate: new Date("2025-01-14T12:30:00"),
  },
  {
    startDate: new Date("2025-01-14T16:00:00"),
    endDate: new Date("2025-01-14T16:30:00"),
  },
];
const parseLocalDate = (dateString: string): Date => {
  if (dateString.endsWith("Z")) {
    dateString = dateString.slice(0, -1);
  }
  return new Date(dateString);
};
const transformSlots = (slots: SlotDoc[]): Slot[] => {
  return slots.map((slot) => ({
    startDate: parseLocalDate(slot.startDate),
    endDate: parseLocalDate(slot.endDate),
  }));
};

const formatDateToLocalISOString = (date: Date): string => {
  const pad = (num: number) => (num < 10 ? "0" : "") + num;
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export const fetchSlots = async (
  startDate: string,
  endDate: string,
  timezone: string
) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/event/free-events?startDate=${startDate}&endDate=${endDate}&timezone=${timezone}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return SLOTS;
  }
};

export const getSlots = async (
  startDate: Date,
  duration: number,
  timezone: string
) => {
  const prepStartDate = formatDateToLocalISOString(startDate);
  const endDate = new Date(startDate);
  endDate.setHours(23, 59, 59, 999);
  const preparedEndDate = formatDateToLocalISOString(endDate);
  const slots = await fetchSlots(prepStartDate, preparedEndDate, timezone);
  const transformedSlots = transformSlots(slots);
  return transformedSlots;
};
