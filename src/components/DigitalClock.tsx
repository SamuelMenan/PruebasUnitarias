// src/components/DigitalClock.tsx
import React, { useEffect, useState } from "react";

const DigitalClock: React.FC = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("es-ES", { hour12: false });
      setTime(formatted);
    };

    updateClock(); // Inicializa al montar
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-2 text-white">Reloj Digital</h2>
      <div className="text-3xl font-mono bg-slate-200 dark:bg-slate-800 p-4 rounded-lg inline-block text-white" data-testid="digital-clock">
        {time}
      </div>
    </div>
  );
};

export default DigitalClock;
