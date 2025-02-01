import { Button, MenuItem, TextField } from "@mui/material";
import { TIMEZONES } from "../../configs/configs";

interface UserEventsSetTimezoneProps {
  timezone: string;
  setTimezone: (timezone: string) => void;
  onClick: () => void;
}

const UserEventsSetTimezone = (props: UserEventsSetTimezoneProps) => {
  const { timezone, setTimezone, onClick } = props;
  return (
    <div className="user-event-form-actions">
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
        <Button className="button" variant="contained" onClick={onClick}>
          Get Events
        </Button>
      </div>
    </div>
  );
};

export default UserEventsSetTimezone;
