import "./UserEventCard.css";

interface UserEventCardDetailItemProps {
  title: string;
  value: string;
}

const UserEventCardDetailItem = (props: UserEventCardDetailItemProps) => {
  const { title, value } = props;
  return (
    <text fontSize={16}>
      {title}: {value}
    </text>
  );
};

export default UserEventCardDetailItem;
