import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  format,
  isWithinInterval,
  areIntervalsOverlapping
} from 'date-fns';
import { Event, CalendarDay } from '../types';

export const generateCalendarDays = (date: Date, events: Event[]): CalendarDay[] => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  return eachDayOfInterval({ start: calendarStart, end: calendarEnd }).map(day => {
    // Filter events for this day
    const dayEvents = events.filter(event => {
      const eventDate = new Date(event.startTime);
      return (
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear()
      );
    });

    return {
      date: day,
      isCurrentMonth: isSameMonth(day, date),
      isToday: isToday(day),
      events: dayEvents
    };
  });
};

export const groupOverlappingEvents = (events: Event[]): Event[][] => {
  if (events.length === 0) return [];
  
  // Sort events by start time
  const sortedEvents = [...events].sort((a, b) => 
    a.startTime.getTime() - b.startTime.getTime()
  );

  const groups: Event[][] = [];
  let currentGroup: Event[] = [sortedEvents[0]];
  
  for (let i = 1; i < sortedEvents.length; i++) {
    const event = sortedEvents[i];
    let overlapping = false;
    
    for (const groupEvent of currentGroup) {
      if (areIntervalsOverlapping(
        { start: groupEvent.startTime, end: groupEvent.endTime },
        { start: event.startTime, end: event.endTime }
      )) {
        overlapping = true;
        break;
      }
    }
    
    if (overlapping) {
      currentGroup.push(event);
    } else {
      groups.push([...currentGroup]);
      currentGroup = [event];
    }
  }
  
  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }
  
  return groups;
};

export const getEventTimeDisplay = (startTime: Date, endTime: Date): string => {
  return `${format(startTime, 'h:mm a')} - ${format(endTime, 'h:mm a')}`;
};