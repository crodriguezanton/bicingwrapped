"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StoryPager from "./StoryPager";
import { BackgroundAnimation } from "./BackgroundAnimation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useWrappedData } from "~/hooks/useWrappedData";
import WelcomeSlide from "./stories/welcome";
import SummarySlide from "./stories/summary";
import { RouterOutputs } from "~/trpc/react";
import TripsSlide from "./stories/trips";
import StationsSlide from "./stories/stations";

const slides = [
  {
    component: WelcomeSlide,
    gradientColors: ["from-red-500", "via-red-400", "to-red-600"],
    backgroundColors: ["bg-red-500", "bg-red-400", "bg-red-600"],
  },
  {
    component: TripsSlide,
    gradientColors: ["from-blue-500", "via-blue-400", "to-blue-600"],
    backgroundColors: ["bg-blue-500", "bg-blue-400", "bg-blue-600"],
  },
  {
    component: StationsSlide,
    gradientColors: ["from-purple-500", "via-purple-400", "to-purple-600"],
    backgroundColors: ["bg-purple-500", "bg-purple-400", "bg-purple-600"],
  },
  {
    component: SummarySlide,
    gradientColors: ["from-orange-500", "via-orange-400", "to-orange-600"],
    backgroundColors: ["bg-orange-500", "bg-orange-400", "bg-orange-600"],
  },
] as {
  component: React.ComponentType<{ data: RouterOutputs["wrapped"]["create"] }>;
  gradientColors: string[];
  backgroundColors: string[];
}[];

export default function Slideshow() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data, loading } = useWrappedData();

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => {
      if (prevSlide === slides.length - 1) {
        return prevSlide;
      }
      return prevSlide + 1;
    });
  }, []);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => {
      if (prevSlide === 0) {
        return prevSlide;
      }
      return prevSlide - 1;
    });
  }, []);

  useEffect(() => {
    let timer = setInterval(goToNextSlide, 10000);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") {
        goToNextSlide();
      } else if (event.key === "ArrowLeft") {
        goToPrevSlide();
      }
      clearInterval(timer);
      timer = setInterval(goToNextSlide, 10000);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearInterval(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToNextSlide, goToPrevSlide]);

  if (!loading && !data) {
    void router.push("/");
    return null;
  }

  if (!data) {
    return null;
  }

  const CurrentSlideComponent = slides[currentSlide]!.component;

  return (
    <div className="relative h-svh w-screen overflow-hidden">
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide]!.backgroundColors.join(" ")}`}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
          scale: [1, 1.1, 1],
        }}
        onClick={() => goToNextSlide()}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <BackgroundAnimation colors={slides[currentSlide]!.gradientColors} />
      <StoryPager
        totalSlides={slides.length}
        currentSlide={currentSlide}
        goToNextSlide={goToNextSlide}
        goToPrevSlide={goToPrevSlide}
      />

      <AnimatePresence mode="wait">
        <CurrentSlideComponent data={data} />
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 flex flex-row items-center justify-center gap-2 bg-gradient-to-t from-white/80 to-transparent pb-6 pt-20">
        <Image src="/logo.svg" width={100} height={50} alt="logo" />
        <div className="text-2xl font-black tracking-tighter text-foreground">
          WRAPPED
        </div>
      </div>
    </div>
  );
}
