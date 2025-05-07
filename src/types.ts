export interface Event {
    id: string;
    title: string;
    startTime: Date;
    endTime: Date;
    color: string;
  }
  
  export interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    events: Event[];
  }