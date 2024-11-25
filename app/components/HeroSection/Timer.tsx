import React, { useState, useEffect } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["200"] });

type LocationSchedule = {
  location: string;
  mealType: string;
  start: string;
  end: string;
};

// Separate weekday and weekend schedules
const weekdaySchedules: LocationSchedule[] = [
  { location: "Parkside", mealType: "Breakfast", start: "07:00", end: "10:00" },
  { location: "Parkside", mealType: "Lunch", start: "11:00", end: "14:30" },
  { location: "Parkside", mealType: "Dinner", start: "16:00", end: "20:30" },
  { location: "Hillside", mealType: "Breakfast", start: "07:00", end: "10:00" },
  { location: "Hillside", mealType: "Lunch", start: "11:00", end: "14:30" },
  { location: "Hillside", mealType: "Dinner", start: "16:00", end: "20:30" },
  {
    location: "Beachside",
    mealType: "Breakfast",
    start: "06:30",
    end: "09:00",
  },
  { location: "Beachside", mealType: "Lunch", start: "11:00", end: "13:30" },
  { location: "Beachside", mealType: "Dinner", start: "17:00", end: "20:30" },
];

const weekendSchedules: LocationSchedule[] = [
  { location: "Parkside", mealType: "Brunch", start: "09:30", end: "13:30" },
  { location: "Parkside", mealType: "Dinner", start: "16:00", end: "19:30" },
  { location: "Hillside", mealType: "Brunch", start: "09:30", end: "13:30" },
  { location: "Hillside", mealType: "Dinner", start: "16:00", end: "19:30" },
  { location: "Beachside", mealType: "Brunch", start: "11:00", end: "13:30" },
  { location: "Beachside", mealType: "Dinner", start: "17:00", end: "19:30" },
];

const Timer: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMeals, setActiveMeals] = useState<LocationSchedule[]>([]);
  const [upcomingMeals, setUpcomingMeals] = useState<LocationSchedule[]>([]);

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      updateMealStatus(now);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTimeUnit = (unit: number) => (unit < 10 ? `0${unit}` : unit);

  const days = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
  const day = days[currentTime.getDay()];
  const hours = formatTimeUnit(currentTime.getHours());
  const minutes = formatTimeUnit(currentTime.getMinutes());
  const seconds = formatTimeUnit(currentTime.getSeconds());

  const updateMealStatus = (now: Date) => {
    const isWeekend = now.getDay() === 0 || now.getDay() === 6; // Sunday or Saturday
    const applicableSchedules = isWeekend ? weekendSchedules : weekdaySchedules;

    const active: LocationSchedule[] = [];
    const upcoming: LocationSchedule[] = [];

    applicableSchedules.forEach((schedule) => {
      const startTime = new Date(`${now.toDateString()} ${schedule.start}`);
      const endTime = new Date(`${now.toDateString()} ${schedule.end}`);

      if (now >= startTime && now < endTime) {
        active.push(schedule);
      } else if (now < startTime) {
        upcoming.push(schedule);
      }
    });

    upcoming.sort((a, b) => {
      const aStart = new Date(`${now.toDateString()} ${a.start}`).getTime();
      const bStart = new Date(`${now.toDateString()} ${b.start}`).getTime();
      return aStart - bStart;
    });

    setActiveMeals(active);
    setUpcomingMeals(upcoming.slice(0, 1)); // Show only the next meal
  };

  const formatTime = (time: string) =>
    new Date(`${currentTime.toDateString()} ${time}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="bg-background-cardLight dark:bg-background-cardDark border-background-borderLight dark:border-background-borderDark border rounded-lg shadow-lg p-4 flex flex-col space-y-2">
      {/* Active Meals */}
      {activeMeals.length > 0 ? (
        <div>
          <p className="text-accent font-bold">Active Meals:</p>
          <ul className="space-y-1">
            {activeMeals.map((meal, index) => (
              <li key={index} className="text-sm">
                {meal.location} - {meal.mealType} ({formatTime(meal.start)} -{" "}
                {formatTime(meal.end)})
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-yellow-500 text-sm">No active meals.</p>
      )}
      {/* Upcoming Meals */}
      {upcomingMeals.length > 0 && (
        <div>
          <p className="text-blue-500 font-bold">Upcoming Meal:</p>
          <ul className="space-y-1">
            {upcomingMeals.map((meal, index) => (
              <li key={index} className="text-sm">
                {meal.location} - {meal.mealType} ({formatTime(meal.start)} -{" "}
                {formatTime(meal.end)})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Timer;
