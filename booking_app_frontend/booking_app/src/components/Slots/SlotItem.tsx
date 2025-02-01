import { Button } from "@mui/material";
import "./Slots.css";
import { Slot } from "../../types/slot.types";

interface SlotItemProps {
  slot: {
    startDate: Date;
    endDate: Date;
  };
  setSelectedSlot: (slot: Slot) => void;
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const SlotItem = (props: SlotItemProps) => {
  const { slot, setSelectedSlot } = props;
  const { startDate } = slot;
  const onClick = () => {
    setSelectedSlot(slot);
  };
  return (
    <div className="slot-item">
      <Button
        className="slot-button"
        variant="outlined"
        color="primary"
        onClick={onClick}
      >
        {formatTime(startDate)}
      </Button>
    </div>
  );
};

export default SlotItem;
