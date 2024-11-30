import React, { useState, useEffect } from "react";

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

const saturdaySchedules: LocationSchedule[] = [
  { location: "Parkside", mealType: "Brunch", start: "Closed", end: "Closed" },
  { location: "Parkside", mealType: "Dinner", start: "Closed", end: "Closed" },
  { location: "Hillside", mealType: "Brunch", start: "09:30", end: "13:30" },
  { location: "Hillside", mealType: "Dinner", start: "16:00", end: "19:30" },
  { location: "Beachside", mealType: "Brunch", start: "11:00", end: "13:30" },
  { location: "Beachside", mealType: "Dinner", start: "17:00", end: "19:30" },
];

const sundaySchedules: LocationSchedule[] = [
  { location: "Parkside", mealType: "Brunch", start: "09:30", end: "13:30" },
  { location: "Parkside", mealType: "Dinner", start: "16:00", end: "19:30" },
  { location: "Hillside", mealType: "Brunch", start: "Closed", end: "Closed" },
  { location: "Hillside", mealType: "Dinner", start: "Closed", end: "Closed" },
  { location: "Beachside", mealType: "Brunch", start: "11:00", end: "13:30" },
  { location: "Beachside", mealType: "Dinner", start: "17:00", end: "19:30" },
];

const MealTimer: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMeals, setActiveMeals] = useState<LocationSchedule[]>([]);
  const [upcomingMeals, setUpcomingMeals] = useState<LocationSchedule[]>([]);
  const [closedLocations, setClosedLocations] = useState<LocationSchedule[]>(
    []
  );

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      updateMealStatus(now);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const updateMealStatus = (now: Date) => {
    let applicableSchedules: LocationSchedule[] = [];
    const dayOfWeek = now.getDay();

    if (dayOfWeek === 0) {
      // Sunday
      applicableSchedules = sundaySchedules;
    } else if (dayOfWeek === 6) {
      // Saturday
      applicableSchedules = saturdaySchedules;
    } else {
      // Weekdays
      applicableSchedules = weekdaySchedules;
    }

    const active: LocationSchedule[] = [];
    const upcoming: LocationSchedule[] = [];
    const closed: LocationSchedule[] = [];

    applicableSchedules.forEach((schedule) => {
      if (schedule.start === "Closed" && schedule.end === "Closed") {
        closed.push(schedule);
      } else {
        const startTime = new Date(`${now.toDateString()} ${schedule.start}`);
        const endTime = new Date(`${now.toDateString()} ${schedule.end}`);

        if (now >= startTime && now < endTime) {
          active.push(schedule);
        } else if (now < startTime) {
          upcoming.push(schedule);
        }
      }
    });

    upcoming.sort((a, b) => {
      const aStart =
        a.start === "Closed"
          ? Infinity
          : new Date(`${now.toDateString()} ${a.start}`).getTime();
      const bStart =
        b.start === "Closed"
          ? Infinity
          : new Date(`${now.toDateString()} ${b.start}`).getTime();
      return aStart - bStart;
    });

    setActiveMeals(active);
    setUpcomingMeals(upcoming);
    setClosedLocations(closed);
  };

  const formatTime = (time: string) =>
    time === "Closed"
      ? "Closed"
      : new Date(`${currentTime.toDateString()} ${time}`).toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        );

  return (
    <div className="bg-background-cardLight dark:bg-background-cardDark border-background-borderLight dark:border-background-borderDark border rounded-lg shadow-lg p-4 flex flex-col space-y-2">
      {/* Active Meals */}
      <div>
        <p className="text-accent font-bold">Active Meals:</p>
        <ul className="space-y-1">
          {activeMeals.length > 0 ? (
            activeMeals.map((meal, index) => (
              <li key={index} className="text-sm">
                {meal.location} - {meal.mealType} ({formatTime(meal.start)} -{" "}
                {formatTime(meal.end)})
              </li>
            ))
          ) : (
            <li className="text-sm">No active meals right now.</li>
          )}
        </ul>
      </div>

      {/* Upcoming Meals */}
      <div>
        <p className="text-[#f0b236] font-bold">Upcoming Meals:</p>
        <ul className="space-y-1">
          {upcomingMeals.length > 0 ? (
            upcomingMeals.map((meal, index) => (
              <li key={index} className="text-sm">
                {meal.location} - {meal.mealType} ({formatTime(meal.start)} -{" "}
                {formatTime(meal.end)})
              </li>
            ))
          ) : (
            <li className="text-sm">No upcoming meals.</li>
          )}
        </ul>
      </div>

      {/* Closed Locations */}
      {closedLocations.length > 0 && (
        <div>
          <p className="text-red-500 font-bold">Closed Locations:</p>
          <ul className="space-y-1">
            {closedLocations.map((location, index) => (
              <li key={index} className="text-sm">
                {location.location} - {location.mealType} (Closed today)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MealTimer;
