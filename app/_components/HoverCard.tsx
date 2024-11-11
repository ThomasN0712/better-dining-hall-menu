// HoverCard.tsx
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

interface MenuItem {
  id: number;
  name: string;
  description: string;
}

interface MealType {
  type: string;
  menuItems: MenuItem[];
}

interface HoverCardProps {
  location: string;
  mealTypes: MealType[];
  onClick?: () => void;
}

const HoverCard: React.FC<HoverCardProps> = ({
  location,
  mealTypes,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);

  const styleProps = useSpring({
    transform: hovered ? "scale(1.03)" : "scale(1)",
    boxShadow: hovered
      ? "0 20px 25px rgba(0, 0, 0, 0.25)"
      : "0 2px 10px rgba(0, 0, 0, 0.1)",
  });

  return (
    <animated.div
      className="w-96 bg-white rounded-lg shadow-lg p-4 text-center flex flex-col items-center justify-center"
      style={styleProps}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <h2 className="text-xl font-bold mb-4 text-gray-900">{location}</h2>
      {mealTypes.map((mealType, idx) => (
        <div key={idx} className="w-full">
          <h3 className="text-lg text-gray-900 font-semibold border-b-2 border-gray-200 pb-1 mb-2">
            {mealType.type}
          </h3>
          <ul className="space-y-2 mb-4">
            {mealType.menuItems.map((item) => (
              <li key={item.id} className="text-sm">
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-gray-800">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </animated.div>
  );
};

export default HoverCard;
