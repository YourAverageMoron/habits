"use client"

import { DailyTotal } from "@/types/dashbard-data";
import DashboardCard from "../DashboardCard";
import { Category } from "@/types/categories";
import { useQuery } from "@tanstack/react-query";
import getDailyTotals from "@/queries/get-daily-totals";
import { MetricNameKeys, MetricsMetadata } from "@/types/metrics";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


type DailyTotalLineCardProps = {
    startDate: Date,
    endDate: Date,
    categories: Category[]
    metrics: Set<MetricNameKeys>
}

const CustomizedDot = (props: any) => {
    const { cx, cy, stroke, value } = props;

    if (value > 0) {
        return <></>;
    }

    return (
        // TODO: should we make these bigger?
        <circle cx={cx} cy={cy} stroke={stroke} r={2} strokeWidth={0} fill="green" />
    );
};

export default function(props: DailyTotalLineCardProps) {
    const queryResult = useQuery({
        queryKey: ["daily-totals", props.startDate, props.endDate],
        queryFn: () => getDailyTotals(props.startDate, props.endDate)
    });

    const metrics = Object.entries(MetricsMetadata).filter(v => props.metrics.has(v[0] as MetricNameKeys)).map(v => v[1]);
    function content(d: DailyTotal[]) {
        return (<>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={d}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis className="text-[5px]" dataKey="date" angle={45} />
                    <YAxis className="text-[5px]" width={15} orientation="left" />
                    <Tooltip />
                    <Legend />
                    {metrics.map(m => <Line type="monotone" dataKey={m.name} stroke={m.color} dot={<CustomizedDot />} />)}
                </LineChart>
            </ResponsiveContainer>
        </>)
    }

    function transform(data: DailyTotal[]): DailyTotal[] {
        return data;
    }

    return <DashboardCard
        className="col-span-1 md:col-span-2 lg:col-span-3 px-0"
        title="Daily Totals"
        queryResult={queryResult}
        content={content}
        dataTransform={transform}
    />

}
