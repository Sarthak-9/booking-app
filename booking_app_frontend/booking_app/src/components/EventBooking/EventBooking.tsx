import { useState } from "react";
import "./EventBooking.css";
import SlotContainer from "../Slots/SlotContainer";
import { Slot } from "../../types/slot.types";
import { EventFormContainer } from "../EventForm/EventFormContainer";
import { SlotDetailsContainer } from "../SlotDetails/SlotDetailsContainer";
import { DatePickerContainer } from "../DatePicker/DatePickerContainer";
import { SlotInputContainer } from "../SlotInput/SlotInputContainer";

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
        <div className="event-booking-common-row">
          <DatePickerContainer
            startDate={startDate}
            setStartDate={setStartDate}
            minDate={true}
          />
          <SlotInputContainer
            startDate={startDate}
            setSlots={setSlots}
            duration={duration}
            setDuration={setDuration}
            timezone={timezone}
            setTimezone={setTimezone}
          />
          <SlotContainer slots={slots} setSelectedSlot={setSelectedSlot} />
        </div>
        <div className="event-booking-common-row">
          <SlotDetailsContainer
            selectedSlot={selectedSlot}
            timezone={timezone}
            duration={duration}
          />
          <EventFormContainer selectedSlot={selectedSlot} timezone={timezone} />
        </div>
      </div>
    </div>
  );
};

export default EventBooking;
