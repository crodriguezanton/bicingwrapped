import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import type { RouterOutputs } from "~/trpc/react";
import Image from "next/image";

export default function SummarySlide({
  data,
}: {
  data: RouterOutputs["wrapped"]["create"];
}) {
  const router = useRouter();
  return (
    <motion.div
      key="summary"
      className="relative z-10 flex h-full flex-col items-center justify-center px-8 py-16"
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 inline text-2xl text-white md:text-3xl"
      >
        El meu 2024 en{" "}
        <Image
          src="/logo.svg"
          alt="Bicing"
          width={100}
          height={100}
          className="inline"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6 text-4xl font-bold text-white md:text-8xl"
      >
        {(data.stats.totalDistance / 1000).toFixed(0)} km{" "}
        <span className="text-2xl text-white/90 md:text-5xl">recorreguts</span>
      </motion.div>
      <div className="flex w-full flex-col justify-center gap-2 pt-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-xl font-semibold leading-relaxed text-white/90 md:text-2xl"
        >
          <span className="text-2xl font-bold sm:text-3xl">
            {(data.stats.totalDuration / 60).toFixed(0)}
          </span>
          min en bicicleta <span className="text-2xl sm:text-3xl">⏳</span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-xl font-semibold leading-relaxed text-white/90 md:text-2xl"
        >
          <span className="text-2xl font-bold sm:text-3xl">
            {data.stats.totalTrips}
          </span>{" "}
          trajectes <span className="text-2xl sm:text-3xl">🚲</span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xl font-semibold leading-relaxed text-white/90 md:text-2xl"
        >
          <span className="text-2xl font-bold sm:text-3xl">
            {
              data.stats.bikeTypes.find((bike) => bike.bikeType === "ELECTRIC")
                ?.count
            }
          </span>{" "}
          en bicis elèctriques <span className="text-2xl sm:text-3xl">⚡</span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xl font-semibold leading-relaxed text-white/90 md:text-2xl"
        >
          <span className="text-2xl font-bold sm:text-3xl">
            {
              data.stats.bikeTypes.find(
                (bike) => bike.bikeType === "MECHANICAL",
              )?.count
            }
          </span>{" "}
          en bicis mecàniques <span className="text-2xl sm:text-3xl">💪</span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-xl font-semibold leading-relaxed text-white/90 md:text-2xl"
        >
          Has fet{" "}
          <span className="text-2xl font-bold sm:text-3xl">
            {data.stats.totalElevationGain.toFixed(0)}
          </span>
          m de desnivell <span className="text-2xl sm:text-3xl">⛰️</span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-xl font-semibold leading-relaxed text-white/90 md:text-2xl"
        >
          Has agafat{" "}
          <span className="text-2xl font-bold sm:text-3xl">
            {data.stats.totalBikeMalfunction}
          </span>{" "}
          bicis espatllades <span className="text-2xl sm:text-3xl">🛠️</span>
          <p className="text-sm text-white/90">
            (les has hagut de deixar al moment)
          </p>
        </motion.p>
      </div>
      <div className="w-full pt-10">
        <Button
          onClick={() => router.push("/resum")}
          variant="secondary"
          className="w-full"
          size="lg"
        >
          Veure el resum complet
        </Button>
      </div>
    </motion.div>
  );
}
