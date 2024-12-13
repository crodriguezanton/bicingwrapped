import { useState, useEffect } from "react";
import { type SlideData } from "~/types/stats";

export const useSlideshow = (slides: SlideData[], interval: number) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [slides, interval]);

  return currentSlide;
};
