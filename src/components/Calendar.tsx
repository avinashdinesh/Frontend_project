import React, { useState, useEffect } from 'react';
import { addMonths, subMonths } from 'date-fns';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import { generateCalendarDays } from '../utils/calendarUtils';
import { Event } from '../types';
import eventList from '../../eventlist.json';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [calendarDays, setCalendarDays] = useState(generateCalendarDays(currentDate, []));

  useEffect(() => {
    // Convert eventlist.json data to Event type
    const loadedEvents = (eventList as any[]).map(item => {
      // Parse date and time
      const [year, month, day] = item.Date.split('-').map(Number);
      const [hours, minutes] = item.Time.split(':').map(Number);
      
      // Create start date
      const startDate = new Date(year, month - 1, day, hours, minutes);
      
      // Create end date (assuming 1 hour duration as default)
      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + 1);
      
      return {
        id: `${item.title}-${item.Date}-${item.Time}`,
        title: item.title,
        startTime: startDate,
        endTime: endDate,
        color: item.color
      };
    });
    
    setEvents(loadedEvents);
  }, []);

  useEffect(() => {
    setCalendarDays(generateCalendarDays(currentDate, events));
  }, [currentDate, events]);

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => addMonths(prevDate, 1));
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="calendar">
      <CalendarHeader 
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onTodayClick={handleTodayClick}
      />
      <CalendarGrid days={calendarDays} />
    </div>
  );
};

export default Calendar;