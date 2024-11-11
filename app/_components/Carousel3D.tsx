// Carousel3D.tsx
"use client";
import React, { useState, useEffect } from "react";
import Carousel from "react-spring-3d-carousel";
import HoverCard from "./HoverCard";
import { config } from "react-spring";
import { locationData } from "@/app/_lib/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
const Carousel3D: React.FC = () => {
  const [goToSlide, setGoToSlide] = useState<number | undefined>(undefined);
  const [offsetRadius, setOffsetRadius] = useState(2);
  const [showArrows, setShowArrows] = useState(true);

  const cards = locationData.map((location, index) => ({
    key: location.location,
    content: (
      <HoverCard
        location={location.location}
        mealTypes={location.mealTypes}
        onClick={() => setGoToSlide(index)}
      />
    ),
  }));

  useEffect(() => {
    setOffsetRadius(2);
    setShowArrows(true);
  }, []);

  return (
    <div className="relative flex justify-center items-center">
      {/* Left Arrow */}
      <div
        className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-transform duration-300 hover:bg-opacity-80 hover:scale-110"
        onClick={() => setGoToSlide((prev) => (prev || 0) - 1)}
      >
        <ChevronLeft />
      </div>

      {/* Carousel Component */}
      <div style={{ width: "400px", height: "500px", margin: "20px" }}>
        <Carousel
          slides={cards}
          goToSlide={goToSlide}
          offsetRadius={offsetRadius}
          showNavigation={false}
          animationConfig={config.gentle}
        />
      </div>

      {/* Right Arrow */}
      <div
        className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-transform duration-300 hover:bg-opacity-80 hover:scale-110"
        onClick={() => setGoToSlide((prev) => (prev || 0) + 1)}
      >
        <ChevronRight />
      </div>
    </div>
  );
};

export default Carousel3D;
