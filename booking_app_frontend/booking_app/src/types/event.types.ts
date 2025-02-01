export interface EventData {
  name: string;
  email: string;
  mobile: string;
  notes: string;
}

export interface Event {
  startDate: Date;
  endDate: Date;
  eventData: EventData;
}

export interface EventDoc {
  startDate: string;
  endDate: string;
  eventData: EventData;
}
