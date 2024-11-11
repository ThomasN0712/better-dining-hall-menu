"use client";
import { cn } from "@/app/_lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
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
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Track active link index

  useEffect(() => {
    let prevScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > prevScrollY;

      if (isScrollingDown) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      prevScrollY = currentScrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 50) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          exit={{
            y: -100,
            opacity: 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-dark-700 rounded-lg bg-white/10 backdrop-blur-md shadow-lg z-[5000] px-8 py-4 items-center justify-center space-x-4",
            className
          )}
        >
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

         {/* Dark Mode Toggle Button */}
         <DarkModeToggle />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
