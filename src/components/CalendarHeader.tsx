import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onTodayClick: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onTodayClick
}) => {
  return (
    <div className="relative flex items-center justify-between mb-6 h-16 px-4">
      {/* Centered Month */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-gray-800">
        {format(currentDate, 'MMMM yyyy')}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-2 ml-auto">
        <button onClick={onPrevMonth} className="calendar-nav-button" aria-label="Previous month">
          <ChevronLeft className="calendar-nav-icon" />
        </button>
        <button onClick={onTodayClick} className="calendar-today-button">
          Today
        </button>
        <button onClick={onNextMonth} className="calendar-nav-button" aria-label="Next month">
          <ChevronRight className="calendar-nav-icon" />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;