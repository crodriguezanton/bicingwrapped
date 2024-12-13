"use client";

interface AnimatedGradientBackgroundProps {
  children: React.ReactNode;
}

export const AnimatedGradientBackground: React.FC<
  AnimatedGradientBackgroundProps
> = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 animate-gradient-x bg-gradient-to-r from-blue-400 via-purple-500 to-orange-500"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};
