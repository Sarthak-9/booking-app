import { useState } from "react";
import "./EventBooking.css";
import DatePicker from "../DatePicker/DatePicker";
import SlotInput from "../SlotInput/SlotInput";
import SlotContainer from "../Slots/SlotContainer";
import { SlotDetails } from "../SlotDetails/SlotDetails";
import EventForm from "../EventForm/EventForm";
import { Slot } from "../../types";

const EventBooking = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [duration, setDuration] = useState<number>(30);
  const [timezone, setTimezone] = useState<string>("America/Los_Angeles");
  return (
    <div className="event-booking-container">
      <h1>Event Booking</h1>
      <div className="event-booking">
        <div className="common-row">
          <div className="common-column">
            <h2>Select Date</h2>
            <DatePicker date={startDate} setDate={setStartDate} />
          </div>
          <div className="common-column">
            <h2>Set duration and timezone</h2>
            <SlotInput
              startDate={startDate}
              setSlots={setSlots}
              duration={duration}
              setDuration={setDuration}
              timezone={timezone}
              setTimezone={setTimezone}
            />
          </div>
          <div className="common-column">
            <h2>Select Slot</h2>
            <SlotContainer slots={slots} setSelectedSlot={setSelectedSlot} />
          </div>
        </div>
        <div className="common-row">
          <div className="common-column">
            <h2>Slot Details</h2>
            {selectedSlot && (
              <SlotDetails
                startDate={selectedSlot.startDate}
                endDate={selectedSlot.endDate}
                duration={duration.toString()}
                timezone={timezone}
              />
            )}
          </div>
          <div className="common-column">
            <h2>Event Form</h2>
            {selectedSlot && <EventForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBooking;
