export interface Event {
  startDate: Date;
  endDate: Date;
  eventData: Record<string, string>;
}
export interface Slots {
  startDate: Date;
  endDate: Date;
}
export interface EventDoc {
  startDate: {
    seconds: number;
    nanoseconds: number;
  };
  endDate: {
    seconds: number;
    nanoseconds: number;
  };
  eventData: Record<string, string>;
}
export interface PreparedEvent {
  preparedStartDate: Date;
  preparedEndDate: Date;
  events: Event[];
}
