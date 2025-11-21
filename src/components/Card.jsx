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
    initial: { opacity: 1 },
    hover: { opacity: 1 },
  };
  
  return (
    <>
      {size === SIZ.SM ? (
        <a className={`${className} mb-2 origin-center cursor-none`} href={link}>
          <motion.div
            variants={parentVariants}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onMouseMove={(e) =>
              setMousePos({ x: e.clientX, y: e.clientY })
            }
            whileHover="hover"
            initial="initial"
            className="flex rounded-2xl sm:rounded-3xl lg:rounded-3xl bg-white 
            items-center justify-center p-4 sm:p-6 lg:p-6 w-full 
            shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_24px_rgba(0,0,0,0.06)] 
            hover:shadow-[0_4px_16px_rgba(0,0,0,0.12),0_16px_32px_rgba(0,0,0,0.08)] 
            transition-shadow duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 w-full">
              {/* LEFT TEXT */}
              <div className="lg:flex flex-col justify-items-center order-2 lg:order-1 space-y-3 sm:space-y-4 lg:space-y-6">
                <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-3xl leading-tight">
                  <span className="satoshi1 font-bold tracking-tight">
                    {title ? title : "Title"}
                  </span>

                  <span className="satoshi4 ml-2" style={{ color: textColor }}>
                    {title2 ? title2 : "Title2"}
                  </span>
                </h1>

                <h2 className="hidden sm:block satoshi6 text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed text-justify">
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
                  background: `linear-gradient(to top, ${
                    gradientStart || "#64319e"
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
                    className="rounded-xl scale-150 w-[95%] sm:w-[80%] lg:w-auto max-w-full 
                    h-auto max-h-[90%] object-contain drop-shadow-2xl"
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
              transition={{ duration: 0.15 , ease: "circInOut"}}
              className="hidden md:flex fixed z-[9999] 
              bg-gray-700 backdrop-blur-xl 
              text-white text-xs font-semibold 
              px-2 py-2 rounded-lg shadow-2xl pointer-events-none"
              style={{
                top: mousePos.y + 20,
                left: mousePos.x + 20,
              }}
            >
              <a
                href={link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                click to view 👀
              </a>
            </motion.div>
          )}
        </a>
      ) : (
        <a className={`${className} mb-2 origin-center `} href={link}>
         <motion.div
            variants={parentVariants}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onMouseMove={(e) =>
              setMousePos({ x: e.clientX, y: e.clientY })
            }
            whileHover="hover"
            initial="initial"
            className="flex rounded-2xl sm:rounded-3xl lg:rounded-3xl bg-white 
            items-center justify-center p-4 sm:p-6 lg:p-6 w-full 
            shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_24px_rgba(0,0,0,0.06)] 
            hover:shadow-[0_4px_16px_rgba(0,0,0,0.12),0_16px_32px_rgba(0,0,0,0.08)] 
            transition-shadow duration-300"
          >
            <div className="flex flex-col lg:grid-rows-2 gap-2 w-full">
              <h1 className="text-xl pl-3 sm:text-2xl lg:text-3xl xl:text-3xl leading-tight">
                <span className="satoshi1 font-bold tracking-tight">
                  {title ? title : "Title"}
                </span>

                <span className={`satoshi4 ml-2`} style={{ color: textColor }}>
                  {title2 ? title2 : "Title2"}
                </span>
              </h1>
              <div
                className="relative flex items-center justify-center w-full aspect-[4/3] lg:aspect-auto lg:h-96 xl:h-[20rem] rounded-2xl lg:rounded-3xl overflow-hidden order-1 lg:order-2"
                style={{
                  background: `linear-gradient(to top, ${
                    gradientStart || "#64319e"
                  }, ${gradientEnd || "#361b62"})`,
                  boxShadow: "inset 0 0 60px rgba(0,0,0,0.5)",
                }}
              >
                <motion.div
                  variants={textVariants}
                  className="absolute inset-0 z-10  text-center"
                >
                  <h1 className="satoshi5 hidden sm:block font-light italic text-jusitfy px-7  text-white ">
                    {content ? content : "Content"}
                  </h1>
                </motion.div>
                <span
                  className="relative top-40 z-100 h-[80px] w-full opacity-65"
                  style={{
                    background: `linear-gradient(to top, ${shadowFrom}, ${shadowTo}, transparent)`,
                  }}
                ></span>

                <motion.div
                  variants={childVariants2}
                  className="absolute inset-0 z-20 flex justify-center items-center"
                >
                  <Image
                    width={450}
                    height={440}
                    alt="project"
                    className="rounded-xl mt-10 w-[95%] sm:w-[80%] lg:w-auto max-w-full h-auto max-h-[90%] object-contain drop-shadow-2xl scale-105"
                    src={image ? image : "/images/projects/interviewD.jpg"}
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
              transition={{ duration: 0.15 , ease: "circInOut"}}
              className="hidden md:flex fixed z-[9999] 
              bg-gray-700 backdrop-blur-xl 
              text-white text-xs font-semibold 
              px-2 py-2 rounded-lg shadow-2xl pointer-events-none"
              style={{
                top: mousePos.y + 20,
                left: mousePos.x + 20,
              }}
            >
              <a
                href={link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                click to view 👀
              </a>
            </motion.div>
          )}
        </a>
      )}
    </>
  );
}

export default Card;
