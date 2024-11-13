// src/components/HoverInfoCard.tsx
import { motion } from "framer-motion";
import { useState } from "react";

interface HoverInfoCardProps {
  name: string;
  info: string[];
}

const HoverInfoCard: React.FC<HoverInfoCardProps> = ({ name, info }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Content */}
      <motion.div
        className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out"
        whileHover={{ scale: 1.05 }}
      >
        <p className="font-semibold">{name}</p>
      </motion.div>

      {/* Hover Info (Allergens or additional details) */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 w-48 p-3 mt-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md rounded-lg z-10"
        >
          <p className="text-sm font-medium mb-2">Additional Info:</p>
          <ul className="text-xs space-y-1">
            {info.length > 0 ? (
              info.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  {item}
                </li>
              ))
            ) : (
              <li className="text-gray-500 dark:text-gray-400">
                No info available
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default HoverInfoCard;
