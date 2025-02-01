import { Slot } from "../../types/slot.types";
import { SlotDetails } from "./SlotDetails";
import "./SlotDetails.css";

interface SlotDetailsContainerProps {
  selectedSlot: Slot | null;
  timezone: string;
  duration: number;
}
export const SlotDetailsContainer = (props: SlotDetailsContainerProps) => {
  const { selectedSlot, timezone, duration } = props;
  return (
    <div className="slot-details-common-column">
      <h2>Slot Details</h2>
      {selectedSlot && (
        <SlotDetails
          startDate={selectedSlot.startDate}
          endDate={selectedSlot.endDate}
          duration={duration.toString()}
          timezone={timezone}
        />
      )}
      {!selectedSlot && <text>Select a slot to view details.</text>}
    </div>
  );
};
