"use client";

import React from "react";

export default function ResumePage() {
  return (
    <iframe
      title="Resume PDF"
      src="/resume.pdf"
      className="w-full h-screen block z-111011 pt-0"
      style={{ border: 0 }}
    />
  );
}
