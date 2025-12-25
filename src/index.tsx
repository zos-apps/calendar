import React, { useState } from 'react';
import type { CalendarProps } from './types';

const ZCalendar: React.FC<CalendarProps> = ({ className, selectedDate, onDateChange }) => {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  const [viewDate, setViewDate] = useState(new Date(currentDate));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const days = [];

  // Previous month's days
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: daysInPrevMonth - i, current: false });
  }

  // Current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, current: true });
  }

  // Next month's days
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({ day: i, current: false });
  }

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const selectDate = (day: number) => {
    const selected = new Date(year, month, day);
    setCurrentDate(selected);
    onDateChange?.(selected);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() &&
           month === today.getMonth() &&
           year === today.getFullYear();
  };

  const isSelected = (day: number) => {
    return day === currentDate.getDate() &&
           month === currentDate.getMonth() &&
           year === currentDate.getFullYear();
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={`flex flex-col h-full bg-white ${className || ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded">←</button>
        <span className="font-semibold">{monthNames[month]} {year}</span>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded">→</button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 border-b">
        {dayNames.map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="flex-1 grid grid-cols-7">
        {days.map(({ day, current }, idx) => (
          <button
            key={idx}
            onClick={() => current && selectDate(day)}
            className={`p-2 text-center hover:bg-gray-50 border-b border-r ${
              !current ? 'text-gray-300' : ''
            } ${isToday(day) && current ? 'bg-blue-100' : ''} ${
              isSelected(day) && current ? 'bg-blue-500 text-white hover:bg-blue-600' : ''
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ZCalendar;
