import CategoryDistributionPieCard from "./CategoryDistributionPieCard";


type DashboardCategoriesProps = {
    startDate?: Date;
    endDate?: Date;
    tags: string[]
}


export default async function(props: DashboardCategoriesProps) {

    return <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3">
        <CategoryDistributionPieCard startDate={props.startDate} endDate={props.endDate} />
    </div>
}


