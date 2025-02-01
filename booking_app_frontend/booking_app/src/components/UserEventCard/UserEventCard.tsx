import { Event } from "../../types/event.types";
import "./UserEventCard.css";
import UserEventCardDetailItem from "./UserEventCardDetailItem";

interface UserEventCardProps {
  event: Event;
}
const UserEventCard = (props: UserEventCardProps) => {
  const { event } = props;
  return (
    <div className="user-event-card-container">
      <div className="user-event-card">
        <UserEventCardDetailItem title="Name" value={event.eventData.name} />
        <UserEventCardDetailItem
          title="Start Date"
          value={event.startDate.toLocaleString()}
        />
        <UserEventCardDetailItem
          title="End Date"
          value={event.endDate.toLocaleString()}
        />
        <UserEventCardDetailItem title="Email" value={event.eventData.email} />
        <UserEventCardDetailItem
          title="Mobile"
          value={event.eventData.mobile}
        />
        <UserEventCardDetailItem title="Notes" value={event.eventData.notes} />
      </div>
    </div>
  );
};

export default UserEventCard;
