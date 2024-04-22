
type Tags = {
    [key: string]: {selected: boolean}
}

type Category = {
    name: string;
    index: number;
    tags: Tags;
}

type Categories = {
    [key: string]: Category;
}
