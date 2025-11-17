"use client";

import Image from "next/image";
import { motion } from "motion/react";
import React, { useState } from "react";

function Card({ title, content, image, gradientStart, gradientEnd, size,className  }) {
  const SIZ = {
    SM: "sm",
    LG: "lg",
  };

  const childVariants = {
    initial: { opacity: 1, scale: 0.95, filter: "blur(4px)", y: 50 },
    hover: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      y: 20,
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
        <div className={`${className} mb-1`}>
          <motion.div
            variants={parentVariants}
            whileHover="hover"
            initial="initial"
            className="flex rounded-4xl bg-white items-center justify-center px-8 max-h-fit w-auto shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] "
          >
            <div className="grid grid-cols-2 gap-10 px-1 py-10">
              <div>
                <h1 className="mb-7 satoshi1 text-5xl">
                  {title ? title : "Title"}
                </h1>
                <h2 className="satoshi6 text-justify">
                  {content
                    ? content
                    : "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, cumque quaerat eos sit quasi possimus obcaecati necessitatibus autem? At praesentium qui excepturi blanditiis quis explicabo laudantium aliquid esse voluptates pariatur!Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, cumque quaerat eos sit quasi possimus obcaecati necessitatibus autem? At praesentium qui excepturi blanditiis quis explicabo laudantium aliquid esse voluptates pariatur!"}
                </h2>
              </div>
              <div
                className={`relative flex justify-center w-37rem h-31rem rounded-3xl bg-gradient-to-t from-[${
                  gradientStart ? gradientStart : "#64319e"
                }]
  to-[${gradientEnd ? gradientEnd : "#361b62"}]
  shadow-[inset_0_0_40px_rgba(0,0,0,0.7)]
  overflow-hidden
`}

                //  className="relative flex justify-center w-37rem h-31rem rounded-3xl
                //  bg-gradient-to-t from-[#64319e] to-[#361b62]
                //  shadow-[inset_0_0_40px_rgba(0,0,0,0.7)]
                //  overflow-hidden"
              >
                <motion.div
                  variants={childVariants}
                  className="absolute inset-0 z-20 flex justify-center items-end"
                >
                  <Image
                    width={350}
                    height={340}
                    alt="project"
                    className="rounded-xl mt-14 absolute"
                    src={image ? image : "/images/projects/interviewD.jpg"}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <div >
          <motion.div
            variants={parentVariants}
            whileHover="hover"
            initial="initial"
            className="flex rounded-4xl bg-white items-center  justify-center px-8 max-h-fit w-auto shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] "
          >
            <div className="grid grid-rows-2 gap-10 px-1 py-10">
              <div>
                <h1 className=" satoshi1 text-5xl">
                  {title ? title : "Title"}
                </h1>
              </div>
              <div
                className={`relative flex justify-center w-37rem h-31rem rounded-3xl bg-gradient-to-t from-[${
                  gradientStart ? gradientStart : "#64319e"
                }] to-[${gradientEnd ? gradientEnd : "#361b62"}]  shadow-[inset_0_0_40px_rgba(0,0,0,0.7)] overflow-hidden`}
              >
                <motion.div
                  variants={childVariants}
                  className="absolute inset-0 z-20 flex justify-center items-end"
                >
                  <Image
                    width={350}
                    height={340}
                    alt="project"
                    className="rounded-xl mt-14 absolute"
                    src={image ? image : "/images/projects/interviewD.jpg"}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
          
        </div>
      )}
    </>
  );
}

export default Card;
