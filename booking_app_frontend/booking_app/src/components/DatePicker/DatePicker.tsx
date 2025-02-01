import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface DatePickerProps {
  date: Date;
  setDate: (date: Date) => void;
}

const DatePicker = (props: DatePickerProps) => {
  const { date, setDate } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateCalendar
        value={date}
        onChange={(date) => {
          const dateToday = new Date().toDateString();
          if (date.toDateString() === dateToday) {
            setDate(date);
          } else {
            const newDate = new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              0,
              0,
              0,
              0
            );
            setDate(newDate);
          }
        }}
        // minDate={dateToday}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
