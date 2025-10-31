export interface DayEntry {
  date: string;
  data: unknown;
}

export interface DaysResponse {
  days: Record<string, DayEntry[]>;
}
