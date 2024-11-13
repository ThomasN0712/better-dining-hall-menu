// src/components/LocationMenuCard.tsx
import HoverInfoCard from "./HoverInfoCard";

interface MenuItem {
  id: number;
  name: string;
  info: string[]; // Array of additional info like allergens
}

interface LocationMenu {
  [mealType: string]: MenuItem[];
}

interface LocationMenuCardProps {
  location: string;
  menu: LocationMenu;
}

const LocationMenuCard: React.FC<LocationMenuCardProps> = ({
  location,
  menu,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg shadow-lg transition-all duration-300 space-y-4">
      {/* Location Header */}
      <h2 className="text-xl font-semibold text-center text-primary dark:text-blue-400 mb-4">
        {location} Dining Menu
      </h2>

      {/* Meal Types */}
      {Object.entries(menu).map(([mealType, items]) => (
        <div key={mealType} className="mb-4">
          {/* Meal Type Header */}
          <h3 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">
            {mealType}
          </h3>

          {/* Meal Items */}
          <div className="space-y-2">
            {items.map((item) => (
              <HoverInfoCard key={item.id} name={item.name} info={item.info} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocationMenuCard;
