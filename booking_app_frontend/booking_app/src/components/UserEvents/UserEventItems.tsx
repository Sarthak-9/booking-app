import UserEventCard from "../UserEventCard/UserEventCard";
import { Event } from "../../types/event.types";

interface UserEventItemsProps {
  events: Event[];
}

const UserEventItems = (props: UserEventItemsProps) => {
  const { events } = props;
  return (
    <div className="user-event-items">
      {events.map((event, index) => (
        <UserEventCard key={index} event={event} />
      ))}
    </div>
  );
};

export default UserEventItems;
