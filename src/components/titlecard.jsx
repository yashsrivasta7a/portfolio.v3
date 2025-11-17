"use client";

import { motion } from "motion/react";
import MouseIcon from "@/components/ui/mouse";

export default function TitleCardWithArrow({
  title,
  tag,
  arrowRotation = "",
  arrowColor = "text-blue-500",
  arrowSize = "w-10 h-10",
  arrowPosition = "",     // tailwind class string
  cardPosition = "",      // tailwind class string
  tagPosition = "",       // tailwind class string
}) {
  return (
    <div className="hidden md:block relative">

      <MouseIcon
        rotate={arrowRotation}
        className={`absolute ${arrowSize} ${arrowColor} ${arrowPosition}`}
      />

      <motion.div
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className={`absolute bg-blue-600 py-2 px-4 rounded-full 
          text-sm font-semibold text-white shadow-md whitespace-nowrap ${cardPosition}`}
      >
        {title}
      </motion.div>

      {tag && (
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute bg-gray-700 py-2 px-4 rounded-full 
            text-xs font-semibold text-white shadow-md whitespace-nowrap ${tagPosition}`}
        >
          {tag}
        </motion.div>
      )}
    </div>
  );
}
