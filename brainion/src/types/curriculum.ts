export interface Goal {
  topic: string;
  duration: number; // in weeks
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface DayContent {
  title: string;
  objectives: string[];
}

export interface WeekContent {
  weekNumber: number;
  days: DayContent[];
}

export interface Curriculum {
  weeks: WeekContent[];
}
