import { Slot } from "../../types/slot.types";
import SlotItem from "./SlotItem";
import "./Slots.css";

interface SlotContainerProps {
  slots: Slot[];
  setSelectedSlot: (slot: Slot) => void;
}

const SlotContainer = (props: SlotContainerProps) => {
  const { slots, setSelectedSlot } = props;
  return (
    <div className="slots-common-column">
      <h2>Select Slot</h2>
      {slots.length ? (
        <div className="slot-container">
          {slots.map((slot, index) => (
            <SlotItem
              key={index}
              slot={slot}
              setSelectedSlot={setSelectedSlot}
            />
          ))}
        </div>
      ) : (
        <text>Find slots to select.</text>
      )}
    </div>
  );
};

export default SlotContainer;
