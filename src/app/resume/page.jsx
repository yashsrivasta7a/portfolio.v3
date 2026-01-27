"use client";
import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

export default function ResumePage() {
  return (
    <div className="min-h-screen w-full pt-32 pb-20 px-4 md:px-8 flex flex-col items-center">

      {/* Header Section */}
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-5xl satoshi1 md:text-7xl font-bold tracking-tighter text-neutral-900 mb-2">
            Resume
          </h1>
          <p className="text-neutral-500 satoshi4 text-lg font-medium">
            My professional journey & qualifications.
          </p>
        </motion.div>

        <motion.a
          href="/2026_Resume.pdf"
          download="Yash_Srivastava_Resume.pdf"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full font-medium shadow-lg hover:bg-neutral-800 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </motion.a>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl w-full h-[100vh]"
      >
        <embed
          src="/2026_Resume.pdf#toolbar=0&navpanes=0&scrollbar=0&pagemode=none&zoom=page-width"
          type="application/pdf"
          className="w-full h-screen"
        />

      </motion.div>

    </div>
  );
}
