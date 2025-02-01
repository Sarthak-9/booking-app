import { useState } from "react";
import { TextField } from "@mui/material";
import "./EventForm.css";
import { bookSlot } from "./eventForm.utils";
import { ActionButton } from "../ActionButton/ActionButton";

interface EventFormProps {
  startDate: Date;
  endDate: Date;
  timezone: string;
}

export const EventForm = (props: EventFormProps) => {
  const { startDate, endDate, timezone } = props;
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!name || !email || !mobile) {
      alert("Please fill all the required fields");
      return false;
    }
    return true;
  };
  const onClick = async () => {
    setIsLoading(true);
    if (validateForm()) {
      await bookSlot(startDate, endDate, timezone, {
        name,
        email,
        mobile,
        notes,
      });
      alert("Form submitted successfully");
    }
    setIsLoading(false);
  };
  return (
    <div className="event-form">
      <div className="event-form-common-column">
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Mobile"
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          fullWidth
        />
        <TextField
          label="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
        />
        <ActionButton
          onClick={onClick}
          isLoading={isLoading}
          title="Book Event"
        />
      </div>
    </div>
  );
};

export default EventForm;
