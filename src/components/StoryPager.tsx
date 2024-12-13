import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "lucide-react";

interface StoryPagerProps {
  totalSlides: number;
  currentSlide: number;
  goToNextSlide: () => void;
  goToPrevSlide: () => void;
}

const StoryPager: React.FC<StoryPagerProps> = ({
  totalSlides,
  currentSlide,
  goToNextSlide,
  goToPrevSlide,
}) => {
  return (
    <div className="absolute left-0 right-0 top-6 z-20 flex flex-col justify-center gap-1 px-4">
      <div className="flex flex-row gap-1 text-sm text-white">
        {Array.from({ length: totalSlides }, (_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              i <= currentSlide ? "w-12 bg-white" : "w-12 bg-white/30"
            }`}
          />
        ))}
      </div>
      <div className="flex flex-row justify-between pt-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={goToPrevSlide}
          disabled={currentSlide === 0}
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={goToNextSlide}
          disabled={currentSlide === totalSlides - 1}
        >
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default StoryPager;
