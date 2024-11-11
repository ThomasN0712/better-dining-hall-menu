"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { experienceData, educationData } from "@/app/_lib/constants";
import ExperienceCard from "./ExperienceCard";
import EducationCard from "./EducationCard";

const Background = () => {
  const [activeTab, setActiveTab] = useState("Experience");

  return (
    <div className="relative z-10 py-16 sm:py-24" id="about">
      {/* <div className="space-y-4 mb-10">
        <motion.h1
          initial={{ opacity: 0, x: -75 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-3xl min-[430px]:text-4xl md:text-5xl font-bold dark:text-stone-200"
        >
          Experience / Education
        </motion.h1>
      </div> */}

      <div className="flex space-x-4 mb-8 justify-center">
        <div className="relative w-full max-w-lg mt-6">
          <div className="flex bg-gray-400 dark:bg-gray-800 rounded-lg overflow-hidden">
            {/* Slider Indicator */}
            <div
              className={`absolute top-0 left-0 w-1/2 h-full bg-gray-800 dark:bg-gray-400 transition-transform duration-300 rounded-lg ${
                activeTab === "Education" ? "transform translate-x-full" : ""
              }`}
            ></div>

            {/* Experience Button */}
            <button
              onClick={() => setActiveTab("Experience")}
              className={`relative py-2 px-4 w-1/2 rounded-lg font-semibold z-10 transition-colors duration-300 ${
                activeTab === "Experience"
                  ? "text-white dark:text-black"
                  : "text-black dark:text-white"
              }`}
            >
              Experience
            </button>

            {/* Education Button */}
            <button
              onClick={() => setActiveTab("Education")}
              className={`relative py-2 px-4 w-1/2 rounded-lg font-semibold z-10 transition-colors duration-300 ${
                activeTab === "Education"
                  ? "text-white dark:text-black"
                  : "text-black dark:text-white"
              }`}
            >
              Education
            </button>
          </div>
        </div>
      </div>

      <div className="relative border border-gray-500 rounded-lg p-4 opacity-80">
        <div className="absolute left-12 md:left-14 top-0 bottom-0 w-0.5 bg-gray-500 opacity 80"></div>{" "}
        <div className="ml-12 space-y-8">
          {activeTab === "Experience" &&
            experienceData.map((experience) => (
              <div
                key={experience.id}
                className="transform md:transition-transform md:duration-300 md:hover:scale-105"
              >
                <ExperienceCard experience={experience} />
              </div>
            ))}
          {activeTab === "Education" &&
            educationData.map((education) => (
              <div
                key={education.id}
                className="transform md:transition-transform md:duration-300 md:hover:scale-105"
              >
                <EducationCard education={education} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Background;
