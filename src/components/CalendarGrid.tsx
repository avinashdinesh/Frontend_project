import React from 'react';
import { format } from 'date-fns';
import { CalendarDay as CalendarDayType } from '../types';
import CalendarDay from './CalendarDay';

interface CalendarGridProps {
  days: CalendarDayType[];
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarGrid: React.FC<CalendarGridProps> = ({ days }) => {
  const numberOfWeeks = Math.ceil(days.length / 7);
  const weeks = Array.from({ length: numberOfWeeks }, (_, i) => 
    days.slice(i * 7, (i + 1) * 7)
  );

  return (
    <div className="grid">
      <div className="weekdays">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>
      
      <div className="days">
        {days.map((day, index) => (
          <CalendarDay key={format(day.date, 'yyyy-MM-dd')} day={day} />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;