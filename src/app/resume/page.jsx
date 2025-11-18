"use client";

import React from "react";

export default function ResumePage() {
  return (
    <iframe
      title="Resume PDF"
      src="/resume.pdf"
      className="w-full h-screen block"
      style={{ border: 0 }}
    />
  );
}
