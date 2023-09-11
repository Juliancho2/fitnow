import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHora(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalo);
    };
  }, []);

  const formatoDeHora = {
    hour: 'numeric',
    minute: 'numeric'
  };

  const formatoDeFecha = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <div className="text-center">
      <div className="text-4xl mb-2">{hora.toLocaleTimeString(undefined, formatoDeHora)}</div>
      <div className="text-xl">{hora.toLocaleDateString(undefined, formatoDeFecha)}</div>
    </div>
  );
};

export default Clock;






