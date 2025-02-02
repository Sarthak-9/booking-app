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
import { ExistingEventError } from "../helpers/routeExecutor";
import config from "../helpers/config";
import {
  validateBookEventRequest,
  validateGetRequests,
} from "../helpers/validators";
import { getEvents, getFreeEvents, bookEvent } from "./event.handler";

jest.mock("../methods/event.method");
jest.mock("../helpers/routeExecutor");
jest.mock("../helpers/config");
jest.mock("../helpers/validators");

describe("Event Handlers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getEvents", () => {
    it("should return transformed events", async () => {
      const req = {
        query: {
          startDate: "2025-02-14T00:00:00.000Z",
          endDate: "2025-02-14T23:59:59.000Z",
          timezone: "America/New_York",
        },
      } as unknown as Request;

      const mockEventDocs = [{ startDate: new Date(), endDate: new Date() }];
      (getEventsFromDateRange as jest.Mock).mockResolvedValue({
        eventDocs: mockEventDocs,
      });
      (transformEventDoc as jest.Mock).mockReturnValue(mockEventDocs);
      (transformEventsToTimezone as jest.Mock).mockReturnValue(mockEventDocs);

      const result = await getEvents(req);

      expect(validateGetRequests).toHaveBeenCalledWith(
        "2025-02-14T00:00:00.000Z"
      );
      expect(getEventsFromDateRange).toHaveBeenCalledWith(
        "2025-02-14T00:00:00.000Z",
        "2025-02-14T23:59:59.000Z",
        "America/New_York"
      );
      expect(transformEventDoc).toHaveBeenCalledWith(mockEventDocs);
      expect(transformEventsToTimezone).toHaveBeenCalledWith(
        mockEventDocs,
        "America/New_York"
      );
      expect(result).toEqual(mockEventDocs);
    });
  });

  describe("getFreeEvents", () => {
    it("should return transformed free slots", async () => {
      const req = {
        query: {
          startDate: "2025-02-14T00:00:00.000Z",
          endDate: "2025-02-14T23:59:59.000Z",
          duration: "30",
          timezone: "America/New_York",
        },
      } as unknown as Request;

      const mockEventDocs = [{ startDate: new Date(), endDate: new Date() }];
      const mockSlotsInUTC = [{ startDate: new Date(), endDate: new Date() }];
      const mockFreeSlots = [{ startDate: new Date(), endDate: new Date() }];
      (getEventsFromDateRange as jest.Mock).mockResolvedValue({
        preparedStartDate: new Date(),
        preparedEndDate: new Date(),
        eventDocs: mockEventDocs,
      });
      (findSlotsInUTC as jest.Mock).mockReturnValue(mockSlotsInUTC);
      (transformEventDoc as jest.Mock).mockReturnValue(mockEventDocs);
      (filterFreeSlots as jest.Mock).mockReturnValue(mockFreeSlots);
      (transformEventsToTimezone as jest.Mock).mockReturnValue(mockFreeSlots);

      const result = await getFreeEvents(req);

      expect(validateGetRequests).toHaveBeenCalledWith(
        "2025-02-14T00:00:00.000Z"
      );
      expect(getEventsFromDateRange).toHaveBeenCalledWith(
        "2025-02-14T00:00:00.000Z",
        "2025-02-14T23:59:59.000Z",
        "America/New_York"
      );
      expect(findSlotsInUTC).toHaveBeenCalledWith(
        expect.any(Date),
        expect.any(Date),
        30,
        "America/New_York"
      );
      expect(transformEventDoc).toHaveBeenCalledWith(mockEventDocs);
      expect(filterFreeSlots).toHaveBeenCalledWith(
        mockSlotsInUTC,
        mockEventDocs,
        expect.any(Date),
        expect.any(Date)
      );
      expect(transformEventsToTimezone).toHaveBeenCalledWith(
        mockFreeSlots,
        "America/New_York"
      );
      expect(result).toEqual(mockFreeSlots);
    });
  });

  describe("bookEvent", () => {
    it("should create an event if the slot is available", async () => {
      const req = {
        body: {
          startDate: "2025-02-14T15:00:00.000Z",
          endDate: "2025-02-14T16:00:00.000Z",
          timezone: "America/New_York",
          eventData: { name: "Test Event" },
        },
      } as unknown as Request;

      const mockEventDocs = [{ startDate: new Date(), endDate: new Date() }];
      (getEventsFromDateRange as jest.Mock).mockResolvedValue({
        preparedStartDate: new Date(),
        preparedEndDate: new Date(),
        eventDocs: mockEventDocs,
      });
      (checkSlotBoundary as jest.Mock).mockReturnValue(true);
      (transformEventDoc as jest.Mock).mockReturnValue(mockEventDocs);
      (checkIfSlotAvailable as jest.Mock).mockReturnValue(true);
      (createEvent as jest.Mock).mockResolvedValue({ id: "123" });

      const result = await bookEvent(req);

      expect(validateBookEventRequest).toHaveBeenCalledWith(
        "2025-02-14T15:00:00.000Z",
        "2025-02-14T16:00:00.000Z"
      );
      expect(getEventsFromDateRange).toHaveBeenCalledWith(
        "2025-02-14T15:00:00.000Z",
        "2025-02-14T16:00:00.000Z",
        "America/New_York"
      );
      expect(checkSlotBoundary).toHaveBeenCalledWith(
        expect.any(Date),
        expect.any(Date)
      );
      expect(transformEventDoc).toHaveBeenCalledWith(mockEventDocs);
      expect(checkIfSlotAvailable).toHaveBeenCalledWith(
        mockEventDocs,
        expect.any(Date),
        expect.any(Date)
      );
      expect(createEvent).toHaveBeenCalledWith(
        expect.any(Date),
        expect.any(Date),
        { name: "Test Event" }
      );
      expect(result).toEqual("Event Created Successfully");
    });
  });
});
