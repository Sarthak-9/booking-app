import axios from "axios";
import { toLocalISOString } from "../../helpers/date.utils";
import { CONFIGS } from "../../configs/configs";

const bookSlotRequest = async (
  startDate: string,
  endDate: string,
  timezone: string,
  eventData: Record<string, string | number>
) => {
  try {
    const response = await axios.post(`${CONFIGS.API_URL}/event/book-event`, {
      startDate,
      endDate,
      timezone,
      eventData,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const bookSlot = async (
  startDate: Date,
  endDate: Date,
  timezone: string,
  eventData: Record<string, string | number>
) => {
  const parsedStartDate = toLocalISOString(startDate);
  const parsedEndDate = toLocalISOString(endDate);
  await bookSlotRequest(parsedStartDate, parsedEndDate, timezone, eventData);
};
