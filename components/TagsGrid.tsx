import { Button, TextInput } from "@tremor/react";
import { Dispatch, SetStateAction, useState } from "react";

export type TagsGridData = {
    [key: string]: {
        selected: boolean,
    }
};

type TypeGridProps = {
    title: string;
    value: TagsGridData;
    setValue: Dispatch<SetStateAction<TagsGridData>>;
};


export const getSelectedTags = (tags: TagsGridData): string[] => Object.keys(tags).filter(key => tags[key].selected);


export function TagsGrid(props: TypeGridProps) {

    const [newTag, setNewTag] = useState<string>("");

    const handleEnterPressed = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            props.setValue(
                {
                    ...props.value,
                    [newTag.toLowerCase()]: { selected: true }
                }
            );
            setNewTag("");
        }
    }

    const handleTagClicked = (tag: string) => {
        const newTagsObject = { ...props.value };
        newTagsObject[tag].selected = !newTagsObject[tag].selected;
        props.setValue(newTagsObject);
    }

    return (
        <>
            <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{props.title}</p>
            <div className="pt-3 grid grid-cols-3 gap-2">
                {Object.keys(props.value).map((tag) => {
                    return (
                        <Button key={`${tag}`} onClick={() => handleTagClicked(tag)} variant={props.value[tag].selected ? "primary" : "secondary"} className="">
                            <p>{tag.charAt(0).toUpperCase() + tag.slice(1)}</p>
                        </Button>
                    )
                })}
            </div>
            <TextInput className="mt-3" value={newTag} onValueChange={(value) => setNewTag(value)} onKeyDown={handleEnterPressed} />
        </>
    );
}
