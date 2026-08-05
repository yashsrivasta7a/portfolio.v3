"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import ExperienceCard from "@/components/ui/ExperienceCard";
import { motion } from "framer-motion";

export default function Internship() {
  const experiences = [
    {
      title: "2026 - Present",
      company: "RazorNext",
      role: "Frontend Intern",
      location: "Gurugram, India",
      duration: "Jul 2026 – Present",
      bullets: [
        "Building high-performance, responsive web interfaces and client applications using Next.js, React, and TypeScript.",
        "Developing modular, reusable UI components with Tailwind CSS and Framer Motion for smooth micro-interactions and cohesive design.",
      ],
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      link: "https://razornext.com/"
    },
    {
      title: "Mid 2026",
      company: "SciTech Industries",
      role: "Software Development Engineer Intern",
      location: "Hybrid ( Remote / Gurugram, India )",
      duration: "Jan 2026 – Jun 2026",
      bullets: [
        "Architected an AWS Edge-to-Cloud telemetry platform (IoT Core, Greengrass V2, Kinesis, Lambda) with an offline-resilient MQTT pipeline, ensuring fault-tolerant monitoring of 50+ industrial edge devices.",
        "Built and maintained full-stack manufacturing applications using Next.js, NestJS, delivering production modules.",
        "Designed an offline-resilient MQTT ingestion pipeline with a 5,000-message local buffer, ensuring fault-tolerant telemetry delivery during network disruptions and edge downtime.",
        "Automated fleet provisioning and OTA deployments for Raspberry Pi edge devices through custom Greengrass components while strengthening cloud security using AWS Secrets Manager and least-privilege IAM policies.",
      ],
      tech: ["AWS IoT", "Next.js", "Nest.js", "Greengrass V2", "TypeScript"],
      link: "https://scitechindustries.com/",
    },
    {
      title: "Early 2026",
      company: "Galaxy.ai",
      role: "Software Development Engineer Intern",
      location: "Remote",
      duration: "Jan 2026 – Feb 2026",
      bullets: [
        "Building an AI-powered workflow automation platform with a visual flow builder for connecting models, tools, and external APIs.",
        "Implemented reusable node components (triggers, inputs, actions) enabling low-code orchestration of multi-step workflows.",
        "Worked on execution and monitoring features to debug and inspect workflow runs reliably.",
        "Collaborating with the core team to refine architecture and ship features rapidly.",
      ],
      tech: ["Next.js", "tRPC", "TypeScript", "Prisma", "Trigger.dev", "Tailwind CSS"],
      link: "https://galaxy.ai",
    },
    {
      title: "Late 2025",
      company: "Adquora",
      role: "Frontend Intern",
      location: "Remote",
      duration: "Sep 2025 – Dec 2025",
      bullets: [
        "Contributing to Adquora’s online presence as part of the core tech team.",
        "Designed & developed the company’s official website.",
        "Collaborating on new product development to strengthen the ecosystem.",
      ],
      tech: ["React", "Next.js", "Tailwind CSS", "Firebase"],
      link: "https://adquora.vercel.app",
    },
    {
      title: "Mid 2025",
      company: "KPMG India",
      role: "Academic Trainee",
      location: "Gurugram, India",
      duration: "Jun 2025 – Aug 2025",
      bullets: [
        "Developed an AI-powered business intelligence agent using LangChain, LangGraph, and Generative AI technologies to retrieve and summarize enterprise data through natural language queries.",
        "Built agent workflows capable of translating business questions into structured database retrieval operations, enabling rapid access to revenue, client, and operational insights.",
        "Designed retrieval and reasoning pipelines that generated structured responses from internal datasets, improving accessibility of business information for non-technical stakeholders.",
      ],
      tech: ["LangChain", "LangGraph", "Generative AI", "Python"],
    },
    {
      title: "2024",
      company: "FISU, MRIIRS",
      role: "React Developer",
      location: "Faridabad, India",
      duration: "Jun 2024 – Sep 2024",
      bullets: [
        "Developed a dynamic React application with real-time event updates.",
        "Built interactive venue navigation and detailed schedules for attendees.",
        "Collaborated with web and mobile teams to maintain UI/feature consistency.",
      ],
      tech: ["React.js", "UI/UX"],
    },
  ];

  const timelineData = experiences.map((exp) => ({
    title: exp.title,
    content: (
      <div>
        <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200"></p>
        <div className="">
          <ExperienceCard
            company={exp.company}
            role={exp.role}
            location={exp.location}
            duration={exp.duration}
            bullets={exp.bullets}
            tech={exp.tech}
            link={exp.link}
          />
        </div>
      </div>
    ),
  }));

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative w-full overflow-clip"
      >
        <Timeline data={timelineData} />
      </motion.div>
    </div>
  );
}
