export interface Stat {
  label: string;
  value: string | number;
}

export interface SlideData {
  title: string;
  subtitle?: string;
  stats: Stat[];
  gradientColors: string[];
  backgroundColors: string[];
}

export interface SummaryData {
  title: string;
  value: string;
  subtitle: string;
  gradientColors: string[];
  backgroundColors: string[];
}
