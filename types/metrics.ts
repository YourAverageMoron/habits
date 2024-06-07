export const Metrics: { [key: string]: string } = {
    count: "count",
    time: "time",
    intensity: "intensity",
    intensity_time: "intensity time",
} as const;

export type MetricsKeys = typeof Metrics[keyof typeof Metrics]

export const INTENSITY_TIME_WEIGHT = 1 / 3;
