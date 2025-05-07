import React from 'react';
import { format } from 'date-fns';
import { CalendarDay as CalendarDayType } from '../types';
import EventItem from './EventItem';
import { groupOverlappingEvents } from '../utils/calendarUtils';

interface CalendarDayProps {
  day: CalendarDayType;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ day }) => {
  const { date, isCurrentMonth, isToday, events } = day;
  const eventGroups = groupOverlappingEvents(events);
  
  return (
    <div className={`day ${!isCurrentMonth ? 'inactive' : ''} ${isToday ? 'today' : ''}`}>
      <div className="day-header">
        <div className={`day-number ${isToday ? 'today-number' : ''}`}>
          {format(date, 'd')}
        </div>
        {isToday && !isCurrentMonth && (
          <span className="today-label">Today</span>
        )}
      </div>
      
      <div className="events custom-scrollbar">
        {eventGroups.map((group, groupIndex) => (
          <div key={`group-${groupIndex}`} className="event-group">
            {group.map(event => (
              <EventItem 
                key={event.id} 
                event={event} 
                isOverlapping={group.length > 1}
                totalInGroup={group.length}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarDay;