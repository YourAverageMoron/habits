import { Badge } from "@tremor/react";

type TagData = {
    id: number;
    event_tag_categories: {
        id: number;
        name: string;
    } | null;
    category_id: number;
    value: string;
}

type EventAccordionBodyTagsProps = {
    tags: TagData[]
}

type TagCatagories = {
    [key: string]: {
        name?: string,
        tags: {
            id: number,
            value: string,
        }[]
    }
}

export function EventAccordionBodyTags(props: EventAccordionBodyTagsProps) {
    const categories = groupTags(props.tags);
    return (
        <>
            {Object.keys(categories).map((c) => (
                <>
                    <p className="font-medium">{categories[c].name}</p>
                    <div className="flex">
                        {categories[c].tags.map((t) => (
                            <Badge className="text-xs font-light">{t.value}</Badge>
                        ))}
                    </div>
                </>
            ))}
        </>
    );
}


function groupTags(tags: TagData[]) {
    const catagories: TagCatagories = {}

    tags.forEach((t) => {
        let category_id = t.category_id.toString()
        if (catagories[category_id] !== undefined) {
            catagories[category_id].tags.push({ id: t.id, value: t.value })
        }
        else {
            catagories[category_id] = {
                name: t.event_tag_categories?.name,
                tags: [{ id: t.id, value: t.value }],
            }
        }
    })

    return catagories
}
