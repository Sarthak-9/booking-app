import { useState } from "react";
import DatePicker from "../DatePicker/DatePicker";
import { Event } from "../../types/event.types";
import "./UserEvents.css";
import { getEvents } from "./userEvents.utils";
import { Button, CircularProgress } from "@mui/material";
import UserEventItems from "./UserEventItems";
import UserEventsSetTimezone from "./UserEventsSetTimezone";
import { ActionButton } from "../ActionButton/ActionButton";

export const UserEvents = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [timezone, setTimezone] = useState<string>("America/Los_Angeles");
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRouting, setIsRouting] = useState(false);
  const onClick = async () => {
    setIsLoading(true);
    const events = await getEvents(startDate, endDate, timezone);
    setEvents(events);
    setIsLoading(false);
  };
  const handlePageChange = () => {
    setIsRouting(true);
    window.location.href = "/book-event";
    setIsRouting(false);
  };
  return (
    <div className="user-events-container">
      <div className="user-events">
        <h1>Booked Events</h1>
        <div className="user-event-form">
          <div className="user-event-common-column">
            <h2>Select Start Date</h2>
            <DatePicker date={startDate} setDate={setStartDate} />
          </div>
          <div className="user-event-common-column">
            <h2>Select End Date</h2>
            <DatePicker date={endDate} setDate={setEndDate} />
          </div>
          <div className="set-timezone-container">
            <h2>Set timezone</h2>
            <UserEventsSetTimezone
              timezone={timezone}
              setTimezone={setTimezone}
              onClick={onClick}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
      <UserEventItems events={events} />
      <ActionButton
        onClick={onClick}
        isLoading={isRouting}
        title="Event Booking"
      />
    </div>
  );
};
