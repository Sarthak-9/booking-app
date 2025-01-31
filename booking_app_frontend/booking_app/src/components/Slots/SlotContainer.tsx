import { Slot } from "../../types";
import SlotItem from "./SlotItem";
import "./Slots.css";

interface SlotContainerProps {
  slots: Slot[];
  setSelectedSlot: (slot: Slot) => void;
}

const SlotContainer = (props: SlotContainerProps) => {
  const { slots, setSelectedSlot } = props;
  return (
    <div className="slot-container">
      {slots.map((slot, index) => (
        <SlotItem key={index} slot={slot} setSelectedSlot={setSelectedSlot} />
      ))}
    </div>
  );
};

export default SlotContainer;
