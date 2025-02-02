import DatePicker from "./DatePicker";
interface DatePickerContainerProps {
  startDate: Date;
  setStartDate: (date: Date) => void;
  minDate: boolean;
}
export const DatePickerContainer = (props: DatePickerContainerProps) => {
  const { startDate, setStartDate, minDate } = props;
  return (
    <div>
      <h2>Select Date</h2>
      <DatePicker date={startDate} setDate={setStartDate} minDate={minDate} />
    </div>
  );
};
