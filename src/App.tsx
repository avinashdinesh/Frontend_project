import React from 'react';
import Calendar from './components/Calendar';
import TimeFlap from './components/TimeFlap';
import { events } from './data/events';
import { Calendar as CalendarIcon } from 'lucide-react';

function App() {
  return (
    <div className="app">
      <div className="app-container">
        <header className="header">
          <div className="logo">
            <CalendarIcon className="icon" />
            <h1 className="title">
              DateDeck Calendar
            </h1>
          </div>
          <TimeFlap />
        </header>
        
        <main className="main">
          <Calendar events={events} />
        </main>
        
       
      </div>
    </div>
  );
}

export default App;