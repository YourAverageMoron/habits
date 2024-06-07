export type CategoryValueAverage = {
    category_value: string;
    category_id: number,
    count: number;
    time: number;
    intensity: number;
    intensity_time: number;

}


export type DailyTotal = {
    date: string,
    count: number,
    totalTime: number,
}


export type HourOfDayAverages = {
    hour: number,
    count: number,
    // average: string,
}
