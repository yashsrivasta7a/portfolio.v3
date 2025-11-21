"use client";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import ExperienceCard from "@/components/ui/ExperienceCard";
import { AnimatedTooltip } from "@/components/ui/shadcn-io/animated-tooltip";

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
            tech={["React.js", "Node.js", "Langchain", "GenAI"]}
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
            tech={["React.js", "UI/UX"]}
          />
        </div>
      ),
    },
  ];

  const people = [
  { id: 1, name: "GitHub", designation: "Code & Projects", link: "https://github.com/yashsrivasta7a", image: "/images/contact/github.svg" },
  { id: 2, name: "LinkedIn", designation: "Professional Profile", link: "https://linkedin.com/in/yashsrivasta7a", image: "/images/contact/linkedin.svg" },
  { id: 7, name: "Instagram", designation: "Photos & Life", link: "https://instagram.com/yashsrivasta7a", image: "/images/contact/instagram.svg" },
  { id: 3, name: "Twitter (X)", designation: "Thoughts & Updates", link: "https://twitter.com/yashsrivasta7a", image: "/images/contact/x.svg" },
  { id: 4, name: "LeetCode", designation: "Coding Challenges", link: "https://leetcode.com/yashsrivasta7a", image: "/images/contact/leetcode.svg" },
  { id: 5, name: "Gmail", designation: "Email Contact", link: "mailto:yashsrivasta7a@gmail.com", image: "/images/contact/gmail.svg" },
  { id: 6, name: "Peerlist", designation: "Developer Portfolio", link: "https://peerlist.io/yashsrivasta7a", image: "/images/contact/peerlist.svg" },
];

  return (
    <div>
      <div className="relative w-full overflow-clip">
        <Timeline data={data} />
      </div>
      <div className="flex flex-row justify-center gap-5 font-bold flex-wrap mt-20 mb-10">
        <h1 className="satoshi3 text-gray-700 text-6xl">CONTACT ME:</h1>
        <div className="flex flex-row items-center justify-center mb-10 w-autos">
          <AnimatedTooltip items={people} />
        </div>
      </div>
    </div>
  );
}
