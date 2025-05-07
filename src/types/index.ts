export interface Event {
  id: string;
  title: string;
  date: string; // Format: YYYY-MM-DD
  startTime: string; // Format: HH:MM (24-hour)
  endTime: string; // Format: HH:MM (24-hour)
  color?: string;
}

export type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: Event[];
};