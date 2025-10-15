import React, { useState, useRef } from "react";

const CountdownTimer: React.FC = () => {
  const [inputTime, setInputTime] = useState("00:00:10");
  const [seconds, setSeconds] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to parse time string (HH:MM or HH:MM:SS) to total seconds
  const parseTimeToSeconds = (timeString: string): number => {
    const parts = timeString.split(':').map(Number);
    if (parts.length === 2) {
      // HH:MM format
      const [hours, minutes] = parts;
      return hours * 3600 + minutes * 60;
    } else if (parts.length === 3) {
      // HH:MM:SS format
      const [hours, minutes, seconds] = parts;
      return hours * 3600 + minutes * 60 + seconds;
    }
    return 0;
  };

  // Function to format seconds to HH:MM:SS or HH:MM based on input format
  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const pad = (num: number) => num.toString().padStart(2, "0");
    
    // Check if input format includes seconds
    const hasSeconds = inputTime.split(':').length === 3;
    
    if (hasSeconds) {
      return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
    } else {
      return `${pad(hours)}:${pad(minutes)}`;
    }
  };

  const startCountdown = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const totalSeconds = parseTimeToSeconds(inputTime);
    setSeconds(totalSeconds);
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev !== null && prev > 0) {
          return prev - 1;
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
      });
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTime(e.target.value);
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-2 text-white">Contador Regresivo</h2>
      <input
        type="text"
        value={inputTime}
        onChange={handleInputChange}
        placeholder="00:00:00 o 00:00"
        className="border rounded px-2 py-1 mr-2 text-white bg-gray-800 placeholder-gray-400 border-gray-600"
        data-testid="input-time"
      />
      <button
        onClick={startCountdown}
        className="bg-emerald-500 text-white px-4 py-2 rounded"
        data-testid="start-btn"
      >
        Iniciar
      </button>
      <div className="text-3xl font-mono bg-slate-200 dark:bg-slate-800 p-4 rounded-lg inline-block mt-4 text-white" data-testid="countdown-timer">
        {seconds !== null ? formatTime(seconds) : (inputTime.split(':').length === 3 ? "--:--:--" : "--:--")}
      </div>
    </div>
  );
};

export default CountdownTimer;
