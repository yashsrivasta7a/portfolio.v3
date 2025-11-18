"use client";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import ExperienceCard from "@/components/ui/ExperienceCard";
export function Internship() {
  const data = [
    {
      title: "2025",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200"></p>
          <div className="">
            <ExperienceCard
              company="Adquora"
              role="SDE Intern"
              location="Remote"
              duration="Sep 2025 – Present"
              bullets={[
                "Contributing to Adquora’s online presence as part of the core tech team.",
                "Designed & developed the company’s official website.",
                "Collaborating on new product development to strengthen the ecosystem.",
              ]}
              tech={["React", "Next.js", "Tailwind CSS", "Firebase"]}
              link="https://adquora.vercel.app"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Early 2025",
      content: (
        <div>
          <ExperienceCard
            company="KPMG India"
            role="Academic Trainee"
            location="Gurugram, India"
            duration="Jun 2025 – Aug 2025"
            bullets={[
              "Worked in the CRM & Automation department focusing on workflow optimization.",
              "Developed multiple Proof of Concepts (PoCs) for internal systems.",
              "Contributed to designing workflows for an internal AI bot and assisted in its development.",
            ]}
            tech={["CRM", "Automation", "AI Workflows", "PoC Development"]}
          />
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <ExperienceCard
            company="FISU, MRIIRS"
            role="React Developer"
            location="Faridabad, India"
            duration="Jun 2024 – Sep 2024"
            bullets={[
              "Developed a dynamic React application with real-time event updates.",
              "Built interactive venue navigation and detailed schedules for attendees.",
              "Collaborated with web and mobile teams to maintain UI/feature consistency.",
            ]}
            tech={["React", "JavaScript", "UI/UX", "Real-time Features"]}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
