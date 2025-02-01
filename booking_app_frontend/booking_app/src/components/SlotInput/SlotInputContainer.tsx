import { Slot } from "../../types/slot.types";
import SlotInput from "./SlotInput";
import "./SlotInput.css";

interface SlotInputContainerProps {
  startDate: Date;
  setSlots: (slots: Slot[]) => void;
  duration: number;
  setDuration: (duration: number) => void;
  timezone: string;
  setTimezone: (timezone: string) => void;
}

export const SlotInputContainer = (props: SlotInputContainerProps) => {
  const { startDate, setSlots, duration, setDuration, timezone, setTimezone } =
    props;
  return (
    <div className="slot-input-container">
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
  );
};
