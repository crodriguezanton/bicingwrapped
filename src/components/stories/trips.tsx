import { motion } from "framer-motion";
import type { RouterOutputs } from "~/trpc/react";

const cities = [
  "Mataró",
  "Girona",
  "Perpinyà",
  "Carcassona",
  "Tolosa",
  "València",
  "Montpeller",
  "Marsella",
  "Saragossa",
  "Palma de Mallorca",
  "Bordeus",
  "Madrid",
  "Lió",
  "Bilbao",
  "Ginebra",
  "Milà",
  "Torí",
  "Florència",
  "Niça",
  "Roma",
  "Nàpols",
  "Munic",
  "Stuttgart",
  "Frankfurt",
  "Venècia",
  "Viena",
  "Brussel·les",
  "Amsterdam",
  "Praga",
  "Berlín",
  "Budapest",
  "Varsòvia",
  "Copenhaguen",
  "Oslo",
  "Estocolm",
  "Hèlsinki",
  "Atenes",
  "Bucarest",
  "Sofia",
  "Istanbul",
];

export default function TripsSlide({
  data,
}: {
  data: RouterOutputs["wrapped"]["create"];
}) {
  const index = Math.floor(data.stats.totalDistance / (50 * 1000));

  return (
    <motion.div
      className="relative z-10 flex h-full flex-col items-center justify-center px-8"
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
      <h1 className="mb-6 text-balance text-center text-3xl font-bold leading-tight text-white md:text-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Has recorregut en bici {(data.stats.totalDistance / 1000).toFixed(0)}{" "}
          km en {data.stats.totalTrips} trajectes
        </motion.div>
      </h1>
      <motion.p
        className="text-center text-2xl leading-relaxed text-white/90 md:text-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {index < cities.length
          ? `Això és la distància que hi ha fins a ${cities[index]} 💪  `
          : `Això és més de la distància que hi ha fins a ${cities[cities.length - 1]} 🤩`}
      </motion.p>
    </motion.div>
  );
}
