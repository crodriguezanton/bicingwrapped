import { motion } from "framer-motion";
import type { RouterOutputs } from "~/trpc/react";

export default function StationsSlide({
  data,
}: {
  data: RouterOutputs["wrapped"]["create"];
}) {
  const topStations = data.stats.topStations.slice(0, 5);

  return (
    <motion.div
      className="relative z-10 flex h-full flex-col items-center justify-center px-12"
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
      <h1 className="mb-6 text-balance text-center text-3xl font-bold leading-tight text-white md:text-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Les teves estacions més habituals son:
        </motion.div>
      </h1>
      <div className="flex w-full flex-col justify-center gap-4 pt-6">
        {topStations.map((station, index) => (
          <motion.div
            key={station.station}
            className="flex justify-between text-xl leading-relaxed text-white/90 md:text-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.2 }}
          >
            <span className="font-bold leading-relaxed">
              {station.stationName}
            </span>
            <div>{station.count}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
