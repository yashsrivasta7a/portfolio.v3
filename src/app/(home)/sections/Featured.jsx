"use client";
import React from "react";
import Card from "@/components/Card.jsx";
import { motion } from "framer-motion";

export default function Featured() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="satoshi5 text-2xl lg:text-3xl mt-10 lg:tracking-widest text-gray-700 flex justify-center mb-6"
      >
        FEATURED PROJECTS
      </motion.div>
      {/* <div className="grid md:grid-cols-2 gap-10 mx-10 md:mx-32"></div> */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="md:grid md:grid-cols-2 gap-6 lg:gap-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mb-40 w-full"
      >
        <Card
          size="sm"
          link="https://interviewd.vercel.app/"
          className="col-span-2"
          title="AI-Powered Mock Interviews"
          title2="with InterviewD"
          textColor="#562ea3"
          content="InterviewD is a cutting-edge interview preparation platform that combines artificial intelligence, real-time video feedback, and comprehensive assessment tools to help candidates prepare for technical interviews. Our platform uses advanced AI technology to create realistic interview scenarios,providing personalized feedback and helping candidates improve their interview skills."
        />
        <Card
          size="lg"
          link="https://auroraplayai.vercel.app/"
          title="Dynamic Playlists Powered"
          shadowTo="#a855f7"
          shadowFrom="#a855f7"
          image="/images/projects/auroraplay.png"
          title2="by Weather & Spotify"
          textColor="#64319e"
          gradientEnd="#64319e"
          gradientStart="#361b62"
          content="Real-time weather insights meet intelligent music curation, delivering personalized listening experiences whenever you need them."
        />
        <Card
          size="lg"
          link="https://adquora.vercel.app/"
          title="Streamlined Digital Presence"
          shadowTo="#123d95"
          shadowFrom="#123d95"
          image="/images/projects/adquora.png"
          title2="for AdQuora"
          textColor="#123d95"
          gradientEnd="#123d95"
          gradientStart="#061b52"
          content="A sleek, conversion-focused website designed to highlight AdQuora's marketing expertise, service offerings, and client success metrics."
        />
        <Card
          size="lg"
          link="https://showfolio.app/"
          title="From Resume to Website"
          shadowTo="#035476"
          shadowFrom="#a63f1a"
          image="/images/projects/showfolio.png"
          title2="in One Click"
          textColor="#035476"
          gradientEnd="#1E2233"
          gradientStart="#035476"
          content="Showfolio simplifies personal branding by converting resumes into stylish, responsive portfolio sites built for professionals."
        />
        <Card
          size="lg"
          link="https://essentialspaceai.vercel.app/"
          title="Share, Organize & Discover. All in"
          shadowTo="#035476"
          shadowFrom="#a63f1a"
          image="/images/projects/es.png"
          title2="your Essential Space"
          textColor="#52B9C8"
          gradientEnd="#52B9C8"
          gradientStart="#035476"
          content="A modern platform for organizing notes, links, and ideas with intelligent search and one-click summaries, plus secure public/private sharing."
        />
        <Card
          size="lg"
          link="https://dreampix.vercel.app/"
          title="Create & Curate AI Art"
          shadowTo="#a63f1a"
          shadowFrom="#a63f1a"
          image="/images/projects/dreampix.png"
          title2="with DreamPix"
          textColor="#ff5418"
          gradientEnd="#ff5418"
          gradientStart="#e05c2c"
          content="An immersive platform that generates unique images from text, featuring a personalized gallery, user accounts, and a polished, modern interface."
        />
        <Card
          size="lg"
          link="https://flow4life.vercel.app/"
          title="Life-Saving Connections, "
          shadowTo="#7b2222"
          shadowFrom="#7b2222"
          image="/images/projects/flow4life.png"
          title2="Powered by Tech"
          textColor="#ef4444"
          gradientEnd="#7b2222"
          gradientStart="#ef4444"
          content="A seamless platform that enables users to request blood, find nearby donors, chat in real time, and stay updated with instant notifications."
        />
      </motion.div>
    </div>
  );
}
