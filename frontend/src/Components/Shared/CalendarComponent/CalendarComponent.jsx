
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';


const CalendarComponent = () => {
    const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="App">
   
      <Calendar
        onChange={onChange}
        value={date}
      />


    </div>
  );
}

export default CalendarComponent;