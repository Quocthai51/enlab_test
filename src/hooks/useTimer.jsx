import { useState, useEffect } from "react";
import useGameStore from "../store/useGameStore";

const useTimer = () => {
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const { isTimerRunning, setIsTimerRunning } = useGameStore();

  useEffect(() => {
    let interval = null;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const seconds = prevTime.seconds + 1;
          const minutes = prevTime.minutes + Math.floor(seconds / 60);

          return {
            minutes: minutes,
            seconds: seconds % 60,
          };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  return { time, stopTimer };
};

export default useTimer;
