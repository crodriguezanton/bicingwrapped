import { motion } from "framer-motion";
import { mockStats } from "~/data/mockStats";
import type { RouterOutputs } from "~/trpc/react";

export default function WelcomeSlide({
  data,
}: {
  data: RouterOutputs["wrapped"]["create"];
}) {
  return (
    <motion.div
      className="relative z-10 flex h-full flex-col items-start justify-center px-12"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1.1 },
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="mb-6 text-5xl font-bold leading-tight text-white md:text-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Ei, {data.profile.details.firstname}!
        </motion.div>
      </h1>
      <h2 className="mb-6 text-3xl font-semibold leading-tight text-white md:text-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Anem a veure com ha anat el teu any amb Bicing!
        </motion.div>
      </h2>
      {mockStats[0]!.subtitle && (
        <motion.p
          className="text-xl leading-relaxed text-white/90 md:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {mockStats[0]!.subtitle.split("\n").map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </motion.p>
      )}
    </motion.div>
  );
}
