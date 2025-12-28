import React, { useState } from 'react';

interface CalendarProps { onClose: () => void; }

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Calendar: React.FC<CalendarProps> = ({ onClose }) => {
  const [date, setDate] = useState(new Date());
  const today = new Date();

  const getDaysInMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1).getDay();
  
  const prevMonth = () => setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  const nextMonth = () => setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  const goToday = () => setDate(new Date());

  const days = getDaysInMonth(date);
  const firstDay = getFirstDayOfMonth(date);
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let i = 1; i <= days; i++) cells.push(i);

  const isToday = (day: number) => day === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold flex items-center gap-2"><span>📅</span>{MONTHS[date.getMonth()]} {date.getFullYear()}</h1>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded">←</button>
          <button onClick={goToday} className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded">Today</button>
          <button onClick={nextMonth} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded">→</button>
        </div>
      </div>
      <div className="flex-1 p-4">
        <div className="grid grid-cols-7 gap-1">
          {DAYS.map(day => <div key={day} className="text-center font-bold text-gray-500 py-2">{day}</div>)}
          {cells.map((day, i) => (
            <div key={i} className={`aspect-square p-2 border rounded-lg ${day ? 'hover:bg-blue-50 cursor-pointer' : ''} ${day && isToday(day) ? 'bg-blue-500 text-white' : ''}`}>
              {day && <span className="text-sm">{day}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
