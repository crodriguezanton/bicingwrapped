import { SlideData, SummaryData } from "~/types/stats";

export const mockStats: SlideData[] = [
  {
    title: "Ei, Carlos!\nAnem a veure com ha anat el teu any amb Bicing",
    stats: [],
    gradientColors: ["from-red-500", "via-red-400", "to-red-600"],
    backgroundColors: ["bg-red-500", "bg-red-400", "bg-red-600"],
  },
  {
    title: "Has fet un total de 701 km\nen 201 trajectes",
    subtitle: "Això és 11 dies sense parar.\nTemps ben gastat.",
    stats: [],
    gradientColors: ["from-blue-500", "via-blue-400", "to-blue-600"],
    backgroundColors: ["bg-blue-500", "bg-blue-400", "bg-blue-600"],
  },
  {
    title: "You listened for\n50,869 minutes",
    subtitle: "That's 11 days nonstop.\nTime well spent.",
    stats: [],
    gradientColors: ["from-purple-500", "via-purple-400", "to-purple-600"],
    backgroundColors: ["bg-purple-500", "bg-purple-400", "bg-purple-600"],
  },
  {
    title: "You peaked on June 14\nat 322 minutes",
    subtitle: "And you were in the\ntop 12% of listeners worldwide.\nNice.",
    stats: [],
    gradientColors: ["from-green-500", "via-green-400", "to-green-600"],
    backgroundColors: ["bg-green-500", "bg-green-400", "bg-green-600"],
  },
];

export const summaryData: SummaryData = {
  title: "My Minutes Listened",
  value: "50,869",
  subtitle:
    "Top 12% of listeners worldwide\nYou peaked on June 14 at 322 minutes",
  gradientColors: ["from-purple-500", "via-purple-400", "to-purple-600"],
  backgroundColors: ["bg-purple-500", "bg-purple-400", "bg-purple-600"],
};
