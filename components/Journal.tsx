import { Textarea } from "@tremor/react";


type JournalProps = {
    value: string;
    onValueChange: ((value: any) => void);
}

export default function Journal(props: JournalProps) {
    return <>
        <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">Journal</p>
        <Textarea className="mt-6 h-48" value={props.value} onValueChange={props.onValueChange} />
    </>
}
