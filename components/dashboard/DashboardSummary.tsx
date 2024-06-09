import DailyTotalLineCard from "./cards/DailyTotalLineCard";
import { Category } from "@/types/tags";
import HoursOfDayBarCard from "./cards/HoursOfDayBarCard";

type DashboardSummaryProps = {
    startDate: Date;
    endDate: Date;
    categories: Category[]
}

export default function(props: DashboardSummaryProps) {
    return <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3">
        <DailyTotalLineCard categories={props.categories} startDate={props.startDate} endDate={props.endDate} />
        <HoursOfDayBarCard categories={props.categories} startDate={props.startDate} endDate={props.endDate} />
    </div>
}


