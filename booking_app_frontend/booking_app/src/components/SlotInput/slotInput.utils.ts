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
const transformSlots = (slots: SlotDoc[]): Slot[] => {
  return slots.map((slot) => ({
    startDate: new Date(slot.startDate),
    endDate: new Date(slot.endDate),
  }));
};

export const fetchSlots = async (
  startDate: Date,
  duration: number,
  timezone: string
) => {
  const endDate = new Date(startDate);
  endDate.setMinutes(endDate.getMinutes() + duration);
  try {
    const response = await axios.get(
      `http://localhost:5000/event/free-events?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&timezone=${timezone}`
    );
    const slots = response.data;
    const transformedSlots = transformSlots(slots);
    return transformedSlots;
  } catch (error) {
    console.error(error);
    return SLOTS;
  }
};
