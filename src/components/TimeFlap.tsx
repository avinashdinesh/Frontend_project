import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const TimeFlap: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [prevTime, setPrevTime] = useState(new Date());
  const [flippingIndices, setFlippingIndices] = useState<number[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevTime(time);
      setTime(new Date());
      
      const currentTimeStr = format(time, 'HH:mm:ss');
      const nextTime = new Date(time.getTime() + 1000);
      const nextTimeStr = format(nextTime, 'HH:mm:ss');
      
      const newFlippingIndices = [];
      for (let i = 0; i < currentTimeStr.length; i++) {
        if (currentTimeStr[i] !== nextTimeStr[i]) {
          newFlippingIndices.push(i);
        }
      }
      setFlippingIndices(newFlippingIndices);
      
      // Reset flipping state after animation
      setTimeout(() => {
        setFlippingIndices([]);
      }, 500);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const renderDigit = (current: string, previous: string, index: number) => {
    const isFlipping = flippingIndices.includes(index);
    return (
      <span 
        key={`digit-${index}`} 
        className={`time-digit ${isFlipping ? 'flipping' : ''}`}
      >
        {isFlipping ? previous : current}
      </span>
    );
  };

  const currentTimeStr = format(time, 'HH:mm:ss');
  const previousTimeStr = format(prevTime, 'HH:mm:ss');
  
  return (
    <div className="time-flap">
      <div className="time-display">
        {currentTimeStr.split('').map((digit, index) => (
          digit === ':' ? (
            <span key={`separator-${index}`} className="time-separator">:</span>
          ) : (
            renderDigit(digit, previousTimeStr[index], index)
          )
        ))}
      </div>
      <div className="date-display">
        {format(time, 'EEEE, MMMM d, yyyy')}
      </div>
    </div>
  );
};

export default TimeFlap;