import { Metrics } from "./metrics";

export interface CategoryValueAverage extends Metrics {
    category_value: string
    category_id: number
}


export interface DailyTotal extends Metrics {
    date: string,

}


export interface HourOfDayAverages extends Metrics {
    hour: number,
}
