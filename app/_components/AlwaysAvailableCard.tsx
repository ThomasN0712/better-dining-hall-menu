"use client";

// AlwaysAvailableCard.tsx
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { alwaysAvailableMenuItems } from "@/app/_lib/constants";

const AlwaysAvailableCard: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  const styleProps = useSpring({
    transform: hovered ? "scale(1.03)" : "scale(1)",
    boxShadow: hovered
      ? "0 20px 25px rgba(0, 0, 0, 0.25)"
      : "0 2px 10px rgba(0, 0, 0, 0.1)",
  });

  return (
    <animated.div
      className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 text-center flex flex-col items-center justify-center"
      style={styleProps}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Always Available
      </h2>
      <ul className="space-y-4">
        {alwaysAvailableMenuItems.map((item) => (
          <li key={item.id} className="w-full text-left">
            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-800">{item.description}</p>
          </li>
        ))}
      </ul>
    </animated.div>
  );
};

export default AlwaysAvailableCard;
