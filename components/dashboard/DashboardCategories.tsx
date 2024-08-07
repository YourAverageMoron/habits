import { Category } from "@/types/categories";
import CategoryDistributionPieCard from "./cards/CategoryDistributionPieCard";


type DashboardCategoriesProps = {
    startDate: Date;
    endDate: Date;
    categories: Category[]
}


export default function(props: DashboardCategoriesProps) {
    return <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3">
        <CategoryDistributionPieCard categories={props.categories} startDate={props.startDate} endDate={props.endDate} />
    </div>
}


