import { TextField, MenuItem, Button } from "@mui/material";
import "./Slots.css";
import { Slot } from "../../types";
import { getSlots } from "./slotInput.utils";

const TIMEZONES = [
  "America/Los_Angeles",
  "America/New_York",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Australia/Sydney",
  "UTC",
];

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

  const onClick = async () => {
    const slots: Slot[] = await getSlots(startDate, duration, timezone);
    props.setSlots(slots);
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
        <Button
          className="button"
          variant="contained"
          color="primary"
          onClick={onClick}
        >
          Find Slots
        </Button>
      </div>
    </div>
  );
};

export default SlotInput;
