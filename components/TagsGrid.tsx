import { Button, TextInput } from "@tremor/react";
import { useEffect, useState } from "react";

export type TagsGridData = {
    [key: string]: {
        selected: boolean,
    }
};

type TypeGridProps = {
    title: string;
    value: TagsGridData;
    onValueChange: ((value: TagsGridData) => void);
};


export const getSelectedTags = (tags: TagsGridData): string[] => Object.keys(tags).filter(key => tags[key].selected);


export function TagsGrid(props: TypeGridProps) {

    const [newTag, setNewTag] = useState<string>("");
    const [tags, setTags] = useState<TagsGridData>(props.value);

    useEffect(() => props.onValueChange(tags), [tags]);

    const handleEnterPressed = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            setTags({ ...tags, [newTag.toLowerCase()]: { selected: true } });
            setNewTag("");

            props.onValueChange({ ...tags, [newTag.toLowerCase()]: { selected: true } })
        }
    }

    const handleTagClicked = (tag: string) => {
        const newTagsObject = { ...props.value };
        newTagsObject[tag].selected = !newTagsObject[tag].selected;
        setTags(newTagsObject);
    }

    return (
        <>
            <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{props.title}</p>
            <div className="pt-3 grid grid-cols-3 gap-2">
                {Object.keys(tags).map((tag) => {
                    return (
                        <Button key={`${tag}`} onClick={() => handleTagClicked(tag)} variant={tags[tag].selected ? "primary" : "secondary"} className="">
                            <p>{tag.charAt(0).toUpperCase() + tag.slice(1)}</p>
                        </Button>
                    )
                })}
            </div>
            <TextInput className="mt-3" value={newTag} onValueChange={(value) => setNewTag(value)} onKeyDown={handleEnterPressed} />
        </>
    );
}
