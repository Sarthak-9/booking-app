import { TextField, MenuItem, Button, CircularProgress } from "@mui/material";
import "./Slots.css";
import { Slot } from "../../types/slot.types";
import { getSlots } from "./slotInput.utils";
import { TIMEZONES } from "../../configs/configs";
import { useState } from "react";

interface SlotInputProps {
  startDate: Date;
  setSlots: (slots: Slot[]) => void;
  duration: number;
  setDuration: (duration: number) => void;
  timezone: string;
  setTimezone: (timezone: string) => void;
}

const SlotInput = (props: SlotInputProps) => {
  const { startDate, duration, setDuration, timezone, setTimezone } = props;
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    setIsLoading(true);
    const slots: Slot[] = await getSlots(startDate, duration, timezone);
    props.setSlots(slots);
    setIsLoading(false);
  };

  return (
    <div className="common-column">
      <TextField
        type="number"
        label="Enter duration"
        value={duration}
        onChange={(e) => setDuration(parseInt(e.target.value))}
        fullWidth
      />
      <TextField
        select
        label="Select Timezone"
        value={timezone}
        onChange={(e) => setTimezone(e.target.value)}
        fullWidth
      >
        {TIMEZONES.map((tz) => (
          <MenuItem key={tz} value={tz}>
            {tz}
          </MenuItem>
        ))}
      </TextField>
      <div className="button-container">
        {isLoading && (
          <div className="loader">
            <CircularProgress></CircularProgress>
          </div>
        )}
        {!isLoading && (
          <Button
            className="button"
            variant="contained"
            color="primary"
            onClick={onClick}
          >
            Find Slots
          </Button>
        )}
      </div>
    </div>
  );
};

export default SlotInput;
