// components/HeroSection/Timer.tsx
import React, { useState, useEffect } from "react";

type TimerProps = {
  mealSchedule: { mealType: string; start: string; end: string }[]; // Array of meal types with start/end times
};

const Timer: React.FC<TimerProps> = ({ mealSchedule }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentMeal, setCurrentMeal] = useState<string | null>(null);
  const [timeUntilNextMeal, setTimeUntilNextMeal] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      updateMealStatus(now);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [mealSchedule]);

  const updateMealStatus = (now: Date) => {
    let activeMeal = null;
    let nextMealStart: Date | null = null;

    for (let i = 0; i < mealSchedule.length; i++) {
      const { mealType, start, end } = mealSchedule[i];
      const startTime = new Date(`${now.toDateString()} ${start}`);
      const endTime = new Date(`${now.toDateString()} ${end}`);

      if (now >= startTime && now < endTime) {
        activeMeal = mealType;
      } else if (now < startTime && !nextMealStart) {
        nextMealStart = startTime;
      }
    }

    setCurrentMeal(activeMeal);
    if (nextMealStart) {
      const timeDiff = nextMealStart.getTime() - now.getTime();
      setTimeUntilNextMeal(formatTimeDiff(timeDiff));
    } else {
      setTimeUntilNextMeal(null); // No next meal today
    }
  };

  const formatTimeDiff = (diff: number) => {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md text-center">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
        Current Time: {currentTime.toLocaleTimeString()}
      </h2>
      {currentMeal ? (
        <p className="text-green-600 dark:text-green-400 mt-2">
          Active Meal: {currentMeal}
        </p>
      ) : (
        <p className="text-yellow-600 dark:text-yellow-400 mt-2">
          No meal currently active.
        </p>
      )}
      {timeUntilNextMeal && (
        <p className="text-blue-600 dark:text-blue-400 mt-2">
          Time until next meal: {timeUntilNextMeal}
        </p>
      )}
    </div>
  );
};

export default Timer;
