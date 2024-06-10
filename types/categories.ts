
export type Tag = {
    value: string,
    category: Category,
}

export type Category = {
    id: number,
    name: string,
}


// TODO: REFACTOR THESE AS THE TYPES ARE A LITTLE MESSY AT THE MOMENT
export type CreateEventTags = {
    [key: string]: { selected: boolean }
}

export type CreateEventCategory = {
    name: string;
    index: number;
    tags: CreateEventTags;
}

export type CreateEventCategories = {
    [key: string]: CreateEventCategory;
}
