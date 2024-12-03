"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AnimatedSentButtonProps {
  buttonColor: string;
  buttonTextColor?: string;
  sentStatus: boolean;
  initialText: React.ReactElement | string;
  changeText: React.ReactElement | string;
  className?: string;
  onClick?: () => void;
}

export const AnimatedSentButton: React.FC<AnimatedSentButtonProps> = ({
  buttonColor,
  sentStatus,
  buttonTextColor,
  changeText,
  initialText,
  className = "",
  onClick,
}) => {
  return (
    <AnimatePresence mode="wait">
      {sentStatus ? (
        <motion.button
          key="sent"
          className={`relative flex w-[200px] items-center justify-center overflow-hidden rounded-md bg-white p-[10px] outline outline-1 outline-black ${className}`}
          onClick={onClick}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.05 }}
        >
          <motion.span
            key="sent-text"
            className="relative block h-full w-full pr-2 font-semibold"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            exit={{ y: 20 }}
            style={{ color: buttonColor }}
          >
            {changeText}
          </motion.span>
        </motion.button>
      ) : (
        <motion.button
          key="initial"
          className={`relative flex w-[200px] cursor-pointer items-center justify-center rounded-md border-none p-[10px] ${className}`}
          style={{ backgroundColor: buttonColor, color: buttonTextColor }}
          onClick={onClick}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.05 }}
        >
          <motion.span
            key="initial-text"
            className="relative block font-semibold"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            exit={{ x: 20 }}
          >
            {initialText}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
