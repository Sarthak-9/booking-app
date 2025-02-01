import axios from "axios";
import { Slot, SlotDoc } from "../../types/slot.types";
import {
  formatDateToLocalISOString,
  parseLocalDate,
} from "../../helpers/date.utils";
import { CONFIGS } from "../../configs/configs";

const transformSlots = (slots: SlotDoc[]): Slot[] => {
  return slots.map((slot) => ({
    startDate: parseLocalDate(slot.startDate),
    endDate: parseLocalDate(slot.endDate),
  }));
};

export const fetchSlots = async (
  startDate: string,
  endDate: string,
  timezone: string
) => {
  try {
    const response = await axios.get(
      `${CONFIGS.API_URL}/event/free-events?startDate=${startDate}&endDate=${endDate}&timezone=${timezone}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
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
