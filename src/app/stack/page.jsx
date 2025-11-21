"use client";

export default function TechStack() {
  const skills = [
    "React.js",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Adobe XD",
    "C++",
    "Firebase",
    "Figma",
    "PostgreSQL",
    "MongoDB",
    "Docker",

  ];

  return (
    <section className=" p-20  justify-center items-center text-center bg-transparent">
      <h2 className="text-3xl tracking-widest mb-4 text-gray-700 satoshi5 ">
        SKILLS
      </h2>

      <div className="flex flex-wrap justify-center gap-3 ">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white text-sm font-medium 
hover:bg-gray-600 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
