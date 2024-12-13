"use client";

import { motion } from "framer-motion";

interface BackgroundAnimationProps {
  colors: string[];
}

export const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({
  colors,
}) => {
  return (
    <>
      {/* Top right decorative element */}
      <motion.div
        className="absolute right-0 top-0 h-64 w-64 opacity-80"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className={`h-full w-full bg-gradient-to-br ${colors[0]} ${colors[1]} ${colors[2]} blur-2xl`}
        />
      </motion.div>

      {/* Bottom left decorative element */}
      <motion.div
        className="absolute bottom-0 left-0 h-32 w-96"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className={`h-full w-full ${colors[0]} blur-xl`} />
      </motion.div>

      {/* Center decorative element */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 transform opacity-60"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className={`h-full w-full rounded-full bg-gradient-to-tl ${colors[1]} ${colors[2]} blur-2xl`}
        />
      </motion.div>
    </>
  );
};
