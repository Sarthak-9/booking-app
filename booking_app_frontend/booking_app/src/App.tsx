import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import EventBooking from "./components/EventBooking/EventBooking";
import { UserEvents } from "./components/UserEvents/UserEvents";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserEvents />} />
        <Route path="/book-event" element={<EventBooking />} />
      </Routes>
    </Router>
  );
};

export default App;
