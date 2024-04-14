import { RiCalendarScheduleLine, } from "@remixicon/react";
import { Button, TextInput } from "@tremor/react";
import { useState } from "react";

type Tags = {
    [key: string]: {
        selected: boolean,
    }
};


export default function TagsGrid() {

    const [newTag, setNewTag] = useState<string>("");

    const [tags, setTags] = useState<Tags>({
        head: {
            selected: true,
        },
        shoulders: {
            selected: false,
        },
        knees: {
            selected: true,
        },
        toes: {
            selected: false,
        },
        legs: {
            selected: false,
        },
        arms: {
            selected: false,
        },
    }
    )

    const handleEnterPressed = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            setTags(
                {
                    ...tags,
                    [newTag.toLowerCase()]: { selected: true }
                }
            );
            setNewTag("");
        }
    }

    const handleTagClicked = (tag: string) => {
        const newTagsObject = { ...tags };
        newTagsObject[tag].selected = !newTagsObject[tag].selected;
        setTags(newTagsObject);
    }

    return (
        <>
            <div className="flex justify-start gap-1 items-center">
                <RiCalendarScheduleLine />
                <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">A name here</p>
            </div>
            <p className="pt-3 text-tremor-default text-tremor-content dark:text-dark-tremor-content">Some description here</p>

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
