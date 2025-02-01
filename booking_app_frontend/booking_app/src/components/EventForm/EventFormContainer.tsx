import { Slot } from "../../types/slot.types";
import EventForm from "./EventForm";
import "./EventForm.css";

interface EventFormContainerProps {
  selectedSlot: Slot | null;
  timezone: string;
}

export const EventFormContainer = (props: EventFormContainerProps) => {
  const { selectedSlot, timezone } = props;
  return (
    <div className="event-form-container">
      <h2>Event Form</h2>
      {selectedSlot && (
        <EventForm
          startDate={selectedSlot.startDate}
          endDate={selectedSlot.endDate}
          timezone={timezone}
        />
      )}
      {!selectedSlot && <text>Select a slot to book an event.</text>}
    </div>
  );
};
