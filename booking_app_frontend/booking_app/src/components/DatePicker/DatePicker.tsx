import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface DatePickerProps {
  date: Date;
  setDate: (date: Date) => void;
}

const DatePicker = (props: DatePickerProps) => {
  const { date, setDate } = props;
  const dateToday = new Date();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateCalendar
        value={date}
        onChange={(date) => setDate(date)}
        // minDate={dateToday}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
