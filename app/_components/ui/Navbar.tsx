"use client";
import { cn } from "@/app/_lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { DarkModeToggle } from "./DarkModeToggle"; // Import the toggle component

export const Navbar = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Track active link index

  return (
    <motion.div
      initial={{
        opacity: 1,
        y: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.2,
      }}
      className={cn(
        "flex w-full fixed top-0 inset-x-0 border-b border-dark-700 shadow-lg z-[5000] px-8 py-4 items-center justify-between",
        className
      )}
    >
      {/* Left Section: Logo and Title */}
      <div className="flex items-center space-x-4">
        {/* Logo (Replace with actual image or SVG if available) */}
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">B</span>
        </div>

        {/* Header Title */}
        <h1 className="text-white font-semibold text-xl">
          Better Dining CSULB
        </h1>
      </div>

      {/* Middle Section: Navigation Links */}
      <div className="flex space-x-6 pr-60">
        {navItems.map((navItem, idx) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative text-neutral-50 items-center flex space-x-1 hover:text-primary transition duration-200"
            )}
            onClick={() => setActiveIndex(idx)} // Set active link on click
          >
            <span className="block sm:hidden text-neutral-50 hover:text-primary transition-colors duration-200">
              {navItem.icon}
            </span>
            <span className="hidden sm:block font-medium relative text-neutral-900 dark:text-white">
              {navItem.name}
              {/* Render underline only for the active link */}
              {activeIndex === idx && (
                <motion.span
                  layoutId="underline"
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-primary"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </span>
          </Link>
        ))}
      </div>

      {/* Right Section: Dark Mode Toggle */}
      <DarkModeToggle />
    </motion.div>
  );
};
