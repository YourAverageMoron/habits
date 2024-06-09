import { Color } from "@tremor/react";

export type Metrics = {
    count: number;
    time: number;
    intensity: number;
    intensity_time: number;
}

type MetricMetadata = {
    name: string;
    color: Color;
}

export type MetricNameKeys = keyof Metrics;

export const MetricsMetadata: { [key in MetricNameKeys]: MetricMetadata } = {
    count: { name: "count", color: 'cyan' },
    time: { name: "time", color: 'fuchsia' },
    intensity: { name: "intensity", color: 'amber' },
    intensity_time: { name: "intensity_time", color: 'emerald' },
} as const;


export const INTENSITY_TIME_WEIGHT = 1 / 3;
