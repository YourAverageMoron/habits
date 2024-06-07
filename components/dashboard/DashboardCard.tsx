import { UseQueryResult } from "@tanstack/react-query";
import { Card, Metric } from "@tremor/react";

type DashboardCardProps<T> = {
    title: string,
    queryResult: UseQueryResult<T>,
    className: string,
    dataTransform?: (d: T) => T,
    content: (d: T) => React.ReactNode,
}

export default function <T>(props: DashboardCardProps<T>) {
    if (props.queryResult.isLoading) {
        return <Card className={props.className} />
    }
    if (props.queryResult.isError || !props.queryResult.data) {
        return <Card className={props.className} />
    }
    const data = props.dataTransform ? props.dataTransform(props.queryResult.data) : props.queryResult.data;
    return <Card className={props.className}>
        <Metric className="pb-4 ml-4">{props.title}</Metric>
        {props.content(data)}
    </Card>
}
