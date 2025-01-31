import { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./EventForm.css";
export const EventForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const validateForm = () => {
    if (!name || !email || !mobile) {
      alert("Please fill all the required fields");
      return false;
    }
    return true;
  };
  const onClick = () => {
    if (validateForm()) {
      alert("Form submitted successfully");
    }
  };
  return (
    <div className="event-form-container">
      <div className="common-column">
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
        <div className="button-container">
          <Button
            className="button"
            variant="contained"
            color="primary"
            onClick={onClick}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
