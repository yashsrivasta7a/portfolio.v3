"use client";

import Image from "next/image";
import { motion } from "motion/react";
import React, { useRef, useState } from "react";

function Card({
  title,
  title2,
  content,
  image,
  textColor,
  gradientStart,
  link,
  gradientEnd,
  size,
  shadowTo,
  shadowFrom,
  className,
}) {
  const SIZ = {
    SM: "sm",
    LG: "lg",
  };

  const [isHovered, setIsHovered] = useState(false);
  const gifRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const childVariants = {
    initial: { opacity: 0.85, scale: 1 },
    hover: {
      opacity: 0.95,
      scale: 1,

      transition: { duration: 0.45, ease: "easeInOut" },
    },
  };
  const childVariants2 = {
    initial: { opacity: 1, scale: 1, y: 20 },
    hover: {
      opacity: 1,
      scale: 0.98,
      y: 80,
      transition: { duration: 0.45, ease: "easeInOut" },
    },
  };


  const textVariants = {
    initial: { opacity: 1, scale: 0.98, y: 80 },
    hover: {
      opacity: 1,
      scale: 1,
      y: 30,
      transition: { duration: 0.45, ease: "easeInOut" },
    },
  };

  const parentVariants = {
    initial: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: {
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <>
      {size === SIZ.SM ? (
        <a className={`${className} mb-6 block origin-center cursor-none`} href={link}>
          <motion.div
            variants={parentVariants}
            initial="initial"
            whileInView="visible"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            viewport={{ once: true, margin: "-50px" }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onMouseMove={(e) =>
              setMousePos({ x: e.clientX, y: e.clientY })
            }
            className="flex rounded-2xl sm:rounded-3xl lg:rounded-3xl bg-white 
            items-center justify-center p-5 sm:p-8 lg:p-6 w-full 
            shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_24px_rgba(0,0,0,0.06)] 
            hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] 
            transition-shadow duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 w-full">
              {/* LEFT TEXT */}
              <div className="lg:flex flex-col justify-items-center order-2 lg:order-1 space-y-3 sm:space-y-4 lg:space-y-6">
                <h1 className="text-2xl sm:text-3xl lg:text-3xl xl:text-3xl leading-tight">
                  <span className="satoshi1 font-bold tracking-tight">
                    {title ? title : "Title"}
                  </span>

                  <span className="satoshi4 ml-2" style={{ color: textColor }}>
                    {title2 ? title2 : "Title2"}
                  </span>
                </h1>

                <h2 className="satoshi6 text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
                  {content
                    ? content
                    : "Lorem ipsum dolor sit amet consectetur adipisicing elit."}
                </h2>
              </div>

              <div
                className="relative flex items-center justify-center w-full 
                aspect-[4/3] lg:aspect-auto lg:h-96 xl:h-[20rem] 
                rounded-2xl lg:rounded-3xl overflow-hidden order-1 lg:order-2"
                style={{
                  background: `linear-gradient(to top, ${gradientStart || "#64319e"
                    }, ${gradientEnd || "#361b62"})`,
                  boxShadow: "inset 0 0 60px rgba(0,0,0,0.5)",
                }}
              >
                <motion.div
                  variants={childVariants}
                  className="absolute inset-0 z-20 flex justify-center items-center"
                >
                  <Image
                    width={250}
                    height={50}
                    alt="project"
                    className="w-[95%] sm:w-[80%] lg:w-[100%] max-w-full 
                    h-auto max-h-[90%] object-contain drop-shadow-2xl rounded-xl scale-150"
                    src={
                      isHovered
                        ? image || "/images/projects/Project.gif"
                        : image
                          ? image.replace(".gif", "-static.jpg")
                          : "/images/projects/interviewD.jpg"
                    }
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15, ease: "circInOut" }}
              className="hidden md:flex fixed z-[9999] 
              bg-gray-800/90 backdrop-blur-xl 
              text-white text-xs font-semibold 
              px-3 py-2 rounded-full shadow-2xl pointer-events-none border border-white/10"
              style={{
                top: mousePos.y + 20,
                left: mousePos.x + 20,
              }}
            >
              <span className="flex items-center gap-1.5">
                View Project <span className="text-lg">↗</span>
              </span>
            </motion.div>
          )}
        </a>
      ) : (
        <a className={`${className} mb-6 block origin-center`} href={link}>
          <motion.div
            variants={parentVariants}
            initial="initial"
            whileInView="visible"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            viewport={{ once: true, margin: "-50px" }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onMouseMove={(e) =>
              setMousePos({ x: e.clientX, y: e.clientY })
            }
            className="flex rounded-2xl sm:rounded-3xl lg:rounded-3xl bg-white 
            items-center justify-center p-5 sm:p-8 lg:p-8 w-full 
            shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_24px_rgba(0,0,0,0.06)] 
            hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] 
            transition-shadow duration-300"
          >
            <div className="flex flex-col lg:grid-rows-2 gap-6 lg:gap-5 w-full">
              <h1 className="text-2xl pl-1 sm:text-3xl lg:text-[2rem] xl:text-[2.2rem] leading-snug lg:leading-relaxed">
                <span className="satoshi1 font-bold tracking-tight">
                  {title ? title : "Title"}
                </span>
                <span className={`satoshi4 block`} style={{ color: textColor }}>
                  {title2 ? title2 : "Title2"}
                </span>
              </h1>
              <div
                className="relative flex items-center justify-center w-full aspect-[4/3] lg:aspect-auto lg:h-[380px] xl:h-[400px] rounded-2xl lg:rounded-3xl overflow-hidden order-1 lg:order-2"
                style={{
                  background: `linear-gradient(to top, ${gradientStart || "#64319e"
                    }, ${gradientEnd || "#361b62"})`,
                  boxShadow: "inset 0 0 60px rgba(0,0,0,0.5)",
                }}
              >
                <motion.div
                  variants={textVariants}
                  className="absolute inset-0 z-10 text-center"
                >
                  <h1 className="satoshi5 hidden sm:block font-light italic text-jusitfy px-7  text-white ">
                    {content ? content : "Content"}
                  </h1>
                </motion.div>


                <motion.div
                  variants={childVariants2}
                  className="absolute inset-0 z-20 flex justify-center items-center"
                >
                  <Image
                    width={450}
                    height={440}
                    alt="project"
                    className="rounded-xl mt-10 w-[90%] sm:w-[85%] lg:w-auto max-w-full h-auto max-h-[90%] object-contain drop-shadow-2xl scale-105"
                    src={image ? image : "/images/projects/interviewD.jpg"}
                  />
                </motion.div>

                {/* Bottom gradient overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-30 h-24 pointer-events-none"
                  style={{
                    background: `linear-gradient(to top, ${gradientStart || "#361b62"}, transparent)`,
                  }}
                />
              </div>
            </div>
          </motion.div>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15, ease: "circInOut" }}
              className="hidden md:flex fixed z-[9999] 
              bg-gray-800/90 backdrop-blur-xl 
              text-white text-xs font-semibold 
              px-3 py-2 rounded-full shadow-2xl pointer-events-none border border-white/10"
              style={{
                top: mousePos.y + 20,
                left: mousePos.x + 20,
              }}
            >
              <span className="flex items-center gap-1.5">
                View Project <span className="text-lg">↗</span>
              </span>
            </motion.div>
          )}
        </a>
      )}
    </>
  );
}

export default Card;
