import "./SlotDetails.css";
import SlotDetailItem from "./SlotDetailItem";

interface SlotDetailsProps {
  startDate: Date;
  endDate: Date;
  duration: string;
  timezone: string;
}

export const SlotDetails = (props: SlotDetailsProps) => {
  const { startDate, endDate, duration, timezone } = props;
  return (
    <div className="slot-details">
      <SlotDetailItem title="Start" value={startDate.toLocaleString()} />
      <SlotDetailItem title="End" value={endDate.toLocaleString()} />
      <SlotDetailItem title="Duration" value={`${duration} minutes`} />
      <SlotDetailItem title="Timezone" value={timezone} />
    </div>
  );
};
