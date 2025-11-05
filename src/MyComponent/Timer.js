import React, { useEffect, useState } from "react";

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Initialize target time from localStorage or set a new one
  const getTargetTime = () => {
    const savedTargetTime = localStorage.getItem("timerTargetTime");
    if (savedTargetTime) {
      return parseInt(savedTargetTime, 10);
    }

    // Set target time 65 days from now
    const newTargetTime = new Date().getTime() + 65 * 24 * 60 * 60 * 1000;
    localStorage.setItem("timerTargetTime", newTargetTime.toString());
    return newTargetTime;
  };

  const [targetTime] = useState(getTargetTime);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  const pad = (num) => String(num).padStart(2, "0");

  const TimeBlock = ({ label, value }) => (
    <div className="text-center flex flex-col items-center">
      <div className="flex space-x-1 mb-1 sm:mb-2">
        {pad(value).split("").map((digit, index) => (
          <span
            key={index}
            className="
              w-8 h-10 sm:w-10 sm:h-12 md:w-12 md:h-14
              flex justify-center items-center
              bg-gradient-to-b from-gray-50 to-white 
              border border-gray-200 rounded-lg shadow-sm 
              text-gray-800 font-bold text-lg sm:text-xl md:text-2xl
            "
          >
            {digit}
          </span>
        ))}
      </div>
      <p className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </p>
    </div>
  );

  const Separator = () => (
    <div className="flex flex-col justify-center items-center h-10 sm:h-12 md:h-14">
      <div className="w-1 h-1 bg-gray-400 rounded-full mb-1"></div>
      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
    </div>
  );

  // Calculate progress percentage
  const progress =
    100 -
    ((targetTime - new Date().getTime()) / (65 * 24 * 60 * 60 * 1000)) * 100;

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
      {/* Countdown blocks */}
      <div
        className="
          flex flex-wrap justify-center items-center 
          gap-2 sm:gap-4 md:gap-6 mb-4 sm:mb-6
        "
      >
        <TimeBlock label="Days" value={timeLeft.days} />
        <Separator />
        <TimeBlock label="Hours" value={timeLeft.hours} />
        <Separator />
        <TimeBlock label="Minutes" value={timeLeft.minutes} />
        <Separator />
        <TimeBlock label="Seconds" value={timeLeft.seconds} />
      </div>

      {/* Progress bar */}
      <div className="mt-4 sm:mt-6 w-full max-w-md mx-auto">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${Math.max(0, Math.min(100, progress))}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
