import { MenuItem, TextField } from "@mui/material";
import { TIMEZONES } from "../../configs/configs";
import { ActionButton } from "../ActionButton/ActionButton";

interface UserEventsSetTimezoneProps {
  timezone: string;
  setTimezone: (timezone: string) => void;
  onClick: () => void;
  isLoading: boolean;
}

const UserEventsSetTimezone = (props: UserEventsSetTimezoneProps) => {
  const { timezone, setTimezone, onClick, isLoading } = props;
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
      <ActionButton
        onClick={onClick}
        isLoading={isLoading}
        title="Get Events"
      />
    </div>
  );
};

export default UserEventsSetTimezone;
