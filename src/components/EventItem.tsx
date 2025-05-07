import React from 'react';
import { Event } from '../types';
import { getEventTimeDisplay } from '../utils/calendarUtils';

interface EventItemProps {
  event: Event;
  isOverlapping: boolean;
  totalInGroup: number;
}

const EventItem: React.FC<EventItemProps> = ({ 
  event, 
  isOverlapping, 
  totalInGroup 
}) => {
  const timeDisplay = getEventTimeDisplay(event.startTime, event.endTime);
  const maxWidth = isOverlapping ? `calc(100% / ${totalInGroup} - 4px)` : '100%';
  
  return (
    <div 
      className="event"
      style={{ 
        backgroundColor: `${event.color}20`,
        borderLeft: `3px solid ${event.color}`,
        maxWidth,
        opacity: 0.9
      }}
    >
      <div className="event-title" style={{ color: event.color }}>
        {event.title}
      </div>
      <div className="event-time">
        {timeDisplay}
      </div>
    </div>
  );
};

export default EventItem;