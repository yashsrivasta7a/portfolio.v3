"use client";

import { motion } from "motion/react";
import Navbar from "./ui/navbar";


export default function NavbarWrapper() {
  return (
    <motion.div
      initial={{ opacity: 0 , scale:0.85 , filter:"blur(20px)"}}
      animate={{ opacity: 1 , scale:1 , filter:"blur(0px)"}}
      transition={{ duration: 0.5 , ease:"easeInOut" }}
    >
      <Navbar
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Resume", href: "/contact" },
        ]}
        activeHref="/"
        className="z-1000 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] rounded-full"
      />
    </motion.div>
  );
}
