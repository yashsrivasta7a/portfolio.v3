"use client";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import ExperienceCard from "@/components/ui/ExperienceCard";
import { AnimatedTooltip } from "@/components/ui/shadcn-io/animated-tooltip";
import { motion } from "framer-motion";

export default function Internship() {
  const data = [
    {
      title: "Early 2026",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200"></p>
          <div className="">
            <ExperienceCard
              company="Galaxy.ai"
              role="SDE Intern"
              location="Remote"
              duration="Jan 2026 – Present"
              bullets={[
                "Building an AI-powered workflow automation platform with a visual flow builder for connecting models, tools, and external APIs.",
                "Implemented reusable node components (triggers, inputs, actions) enabling low-code orchestration of multi-step workflows.",
                "Worked on execution and monitoring features to debug and inspect workflow runs reliably.",
                "Collaborating with the core team to refine architecture and ship features rapidly.",
              ]}
              tech={["Next.js", "tRPC", "TypeScript", "Prisma", "Trigger.dev", "Tailwind CSS"]}
              link="https://galaxy.ai"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Late 2025",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200"></p>
          <div className="">
            <ExperienceCard
              company="Adquora"
              role="SDE Intern"
              location="Remote"
              duration="Sep 2025 – Dec 2025"
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
    {
      id: 1,
      name: "GitHub",
      designation: "Code & Projects",
      link: "https://github.com/yashsrivasta7a",
      image: "/images/contact/github.svg",
    },
    {
      id: 2,
      name: "LinkedIn",
      designation: "Professional Profile",
      link: "https://linkedin.com/in/yashsrivasta7a",
      image: "/images/contact/linkedin.svg",
    },
    {
      id: 7,
      name: "Instagram",
      designation: "Photos & Life",
      link: "https://instagram.com/yashsrivasta7a",
      image: "/images/contact/instagram.svg",
    },
    {
      id: 3,
      name: "Twitter (X)",
      designation: "Thoughts & Updates",
      link: "https://twitter.com/yashsrivasta7a",
      image: "/images/contact/x.svg",
    },
    {
      id: 4,
      name: "LeetCode",
      designation: "Coding Challenges",
      link: "https://leetcode.com/yashsrivasta7a",
      image: "/images/contact/leetcode.svg",
    },
    {
      id: 5,
      name: "Gmail",
      designation: "Email Contact",
      link: "mailto:yashsrivasta7a@gmail.com",
      image: "/images/contact/gmail.svg",
    },
    {
      id: 6,
      name: "Peerlist",
      designation: "Developer Portfolio",
      link: "https://peerlist.io/yashsrivasta7a",
      image: "/images/contact/peerlist.svg",
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative w-full overflow-clip"
      >
        <Timeline data={data} />
      </motion.div>


      {/* <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex flex-col lg:flex-row justify-center items-center gap-5 font-bold flex-wrap mt-20 mb-10"
      >
        <h1 className="satoshi3 text-gray-700 text-4xl md:text-6xl text-center">CONTACT ME:</h1>
        <div className="flex flex-row items-center justify-center w-autos">
          <AnimatedTooltip items={people} />
        </div>
      </motion.div> */}
    </div>
  );
}
