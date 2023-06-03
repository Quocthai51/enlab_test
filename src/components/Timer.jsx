import React, { useEffect } from "react";
import useTimer from "../hooks/useTimer";
import { BiTimer } from "react-icons/bi";
import "./Timer.css";
import { IconContext } from "react-icons";
import useGameStore from "../store/useGameStore";

const Timer = () => {
  const { time } = useTimer();
  const {globeTime, setGlobeTime, isTimerRunning} = useGameStore();
 
  useEffect(() => {
    setGlobeTime(time);
  }, [time]);

  return (
    <div className="Timer">
      <IconContext.Provider value={{ size: 30 }}>
        <BiTimer />
      </IconContext.Provider>
      Time: {time.minutes < 10 ? "0" + time.minutes : time.minutes}:
      {time.seconds < 10 ? "0" + time.seconds : time.seconds}
    </div>
  );
};

export default Timer;
