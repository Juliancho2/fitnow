import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [hour, setHour] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setHour(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formHour: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false, 
  };

  const formDate: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <div className="text-center">
      <div className="text-4xl mb-2">
        {hour.toLocaleTimeString('es-ES', formHour)}
      </div>
      <div className="text-xl">
        {hour.toLocaleDateString('es-ES', formDate)}
      </div>
    </div>
  );
};

export default Clock;










