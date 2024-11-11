"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Tab {
  name: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<string>("Work");

  return (
    <div className="tabs-container">
      <div className="tab-buttons flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`py-2 px-4 rounded-lg font-semibold ${
              activeTab === tab.name ? "bg-gray-800 text-white" : "bg-gray-300 text-black"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="tab-content mt-8">
        {tabs.map((tab) =>
          activeTab === tab.name ? (
            <motion.div
              key={tab.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {tab.content}
            </motion.div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Tabs;
