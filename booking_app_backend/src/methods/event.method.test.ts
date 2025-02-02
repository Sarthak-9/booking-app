import {
  prepareEventDates,
  generateSlotsForDay,
  findSlotDates,
  filterSlots,
  generateSlots,
  prepareQueryForEvents,
  getStoredEventsForDate,
  getEventsFromDateRange,
  createEvent,
  checkIfSlotAvailable,
  transformEventDoc,
  filterFreeSlots,
  convertSlotsToTimezone,
  transformEventsToTimezone,
  convertSlotsToUTC,
  findSlotsInUTC,
  checkSlotBoundary,
} from "./event.method";
import { db } from "../helpers/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import config from "../helpers/config";
import moment from "moment-timezone";

jest.mock("../helpers/firebase");
jest.mock("firebase/firestore");
jest.mock("../helpers/config");

describe("Event Methods", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("prepareEventDates", () => {
    it("should prepare event dates correctly", () => {
      const startDate = "2025-02-14T15:00:00.000Z";
      const endDate = "2025-02-14T16:00:00.000Z";
      const timezone = "America/New_York";

      const result = prepareEventDates(startDate, endDate, timezone);

      expect(result.preparedStartDate).toBeInstanceOf(Date);
      expect(result.preparedEndDate).toBeInstanceOf(Date);
    });
  });

  describe("generateSlotsForDay", () => {
    it("should generate slots for a day", () => {
      const start = new Date("2025-02-14T00:00:00.000Z");
      const eventDuration = 30;

      const result = generateSlotsForDay(start, eventDuration);

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("findSlotDates", () => {
    it("should find slot dates", () => {
      const start = new Date("2025-02-14T00:00:00.000Z");
      const end = new Date("2025-02-14T23:59:59.000Z");
      const eventDuration = 30;

      const result = findSlotDates(start, end, eventDuration);

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("filterSlots", () => {
    it("should filter slots", () => {
      const start = new Date("2025-02-14T00:00:00.000Z");
      const end = new Date("2025-02-14T23:59:59.000Z");
      const slots = [
        {
          startDate: new Date("2025-02-14T01:00:00.000Z"),
          endDate: new Date("2025-02-14T01:30:00.000Z"),
        },
        {
          startDate: new Date("2025-02-14T02:00:00.000Z"),
          endDate: new Date("2025-02-14T02:30:00.000Z"),
        },
      ];

      const result = filterSlots(start, end, slots);

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(2);
    });
  });

  describe("generateSlots", () => {
    it("should generate slots", () => {
      const start = new Date("2025-02-14T00:00:00.000Z");
      const end = new Date("2025-02-14T23:59:59.000Z");
      const eventDuration = 30;

      const result = generateSlots(start, end, eventDuration);

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("prepareQueryForEvents", () => {
    it("should prepare query constraints for events", () => {
      const startDate = new Date("2025-02-14T00:00:00.000Z");
      const endDate = new Date("2025-02-14T23:59:59.000Z");

      const result = prepareQueryForEvents(startDate, endDate);

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(2);
    });
  });

  describe("getStoredEventsForDate", () => {
    it("should get stored events for date", async () => {
      const queryConstraints = [
        where("startDate", ">=", new Date("2025-02-14T00:00:00.000Z")),
      ];
      const mockDocs = [
        { data: () => ({ startDate: new Date(), endDate: new Date() }) },
      ];
      (getDocs as jest.Mock).mockResolvedValue({ docs: mockDocs });

      const result = await getStoredEventsForDate(queryConstraints);

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(1);
    });
  });

  describe("getEventsFromDateRange", () => {
    it("should get events from date range", async () => {
      const startDate = "2025-02-14T00:00:00.000Z";
      const endDate = "2025-02-14T23:59:59.000Z";
      const timezone = "America/New_York";
      const result = await getEventsFromDateRange(startDate, endDate, timezone);

      expect(result.eventDocs).toBeInstanceOf(Array);
      expect(result.eventDocs.length).toBe(1);
    });
  });

  describe("createEvent", () => {
    it("should create an event", async () => {
      const startDate = new Date("2025-02-14T15:00:00.000Z");
      const endDate = new Date("2025-02-14T16:00:00.000Z");
      const eventData = {
        name: "Test Event",
        email: "test@test.com",
        mobile: "1234567890",
        notes: "test notes",
      };
      (addDoc as jest.Mock).mockResolvedValue({ id: "123" });

      const result = await createEvent(startDate, endDate, eventData);

      expect(result).toEqual({ id: "123" });
    });
  });

  describe("checkIfSlotAvailable", () => {
    it("should check if slot is available", () => {
      const events = [
        {
          startDate: new Date("2025-02-14T15:00:00.000Z"),
          endDate: new Date("2025-02-14T16:00:00.000Z"),
          eventData: {
            name: "Test Event",
            email: "test@test.com",
            mobile: "1234567890",
            notes: "test notes",
          },
        },
      ];
      const startDate = new Date("2025-02-14T16:00:00.000Z");
      const endDate = new Date("2025-02-14T17:00:00.000Z");

      const result = checkIfSlotAvailable(events, startDate, endDate);

      expect(result).toBe(true);
    });
  });

  describe("transformEventDoc", () => {
    it("should transform event documents", () => {
      const eventDocs = [
        {
          startDate: { seconds: 1672531200, nanoseconds: 0 },
          endDate: { seconds: 1672534800, nanoseconds: 0 },
          eventData: {
            name: "Test Event",
            email: "test@test.com",
            mobile: "1234567890",
            notes: "test notes",
          },
        },
      ];

      const result = transformEventDoc(eventDocs);

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(1);
      expect(result[0].startDate).toBeInstanceOf(Date);
      expect(result[0].endDate).toBeInstanceOf(Date);
    });
  });

  describe("filterFreeSlots", () => {
    it("should filter free slots", () => {
      const slots = [
        {
          startDate: new Date("2025-02-14T15:00:00.000Z"),
          endDate: new Date("2025-02-14T15:30:00.000Z"),
        },
        {
          startDate: new Date("2025-02-14T15:30:00.000Z"),
          endDate: new Date("2025-02-14T16:00:00.000Z"),
        },
      ];
      const events = [
        {
          startDate: new Date("2025-02-14T15:00:00.000Z"),
          endDate: new Date("2025-02-14T15:30:00.000Z"),
          eventData: {
            name: "Test Event",
            email: "test@test.com",
            mobile: "1234567890",
            notes: "test notes",
          },
        },
      ];
      const startDate = new Date("2025-02-14T00:00:00.000Z");
      const endDate = new Date("2025-02-14T23:59:59.000Z");

      const result = filterFreeSlots(slots, events, startDate, endDate);

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(1);
    });
  });

  describe("convertSlotsToTimezone", () => {
    it("should convert slots to timezone", () => {
      const slots = [
        {
          startDate: new Date("2025-02-14T15:00:00.000Z"),
          endDate: new Date("2025-02-14T15:30:00.000Z"),
        },
      ];
      const timezone = "America/New_York";

      const result = convertSlotsToTimezone(slots, timezone);

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(1);
      expect(result[0].startDate).toBeInstanceOf(Date);
      expect(result[0].endDate).toBeInstanceOf(Date);
    });
  });

  describe("transformEventsToTimezone", () => {
    it("should transform events to timezone", () => {
      const events = [
        {
          startDate: new Date("2025-02-14T15:00:00.000Z"),
          endDate: new Date("2025-02-14T15:30:00.000Z"),
        },
      ];
      const timezone = "America/New_York";

      const result = transformEventsToTimezone(events, timezone);

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(1);
      expect(result[0].startDate).toBeInstanceOf(Date);
      expect(result[0].endDate).toBeInstanceOf(Date);
    });
  });

  describe("convertSlotsToUTC", () => {
    it("should convert slots to UTC", () => {
      const slots = [
        {
          startDate: new Date("2025-02-14T15:00:00.000Z"),
          endDate: new Date("2025-02-14T15:30:00.000Z"),
        },
      ];
      const timezone = "America/New_York";

      const result = convertSlotsToUTC(slots, timezone);

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(1);
      expect(result[0].startDate).toBeInstanceOf(Date);
      expect(result[0].endDate).toBeInstanceOf(Date);
    });
  });

  describe("findSlotsInUTC", () => {
    it("should find slots in UTC", () => {
      const preparedStartDate = new Date("2025-02-14T00:00:00.000Z");
      const preparedEndDate = new Date("2025-02-14T23:59:59.000Z");
      const eventDuration = 30;
      const timezone = "America/New_York";
      const result = findSlotsInUTC(
        preparedStartDate,
        preparedEndDate,
        eventDuration,
        timezone
      );

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("checkSlotBoundary", () => {
    it("should check slot boundary", () => {
      const preparedStartDate = new Date("2025-02-14T15:00:00.000Z");
      const preparedEndDate = new Date("2025-02-14T15:30:00.000Z");
      const result = checkSlotBoundary(preparedStartDate, preparedEndDate);
      expect(result).toBe(false);
    });
  });
});
