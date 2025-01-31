import "./Slots.css";

interface SlotDetailItemProps {
  title: string;
  value: string;
}

const SlotDetailItem = (props: SlotDetailItemProps) => {
  const { title, value } = props;
  return (
    <text fontSize={16}>
      {title}: {value}
    </text>
  );
};

export default SlotDetailItem;
