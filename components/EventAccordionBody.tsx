"use client"
import { Button } from "@tremor/react";


export function EventAccordionBody() {
    return <div>
        <p>Start Time - 1111</p>
        <p>End Time - 1111</p>
        <p>Intensity - 1</p>
        <div className="flex justify-center gap-3">
            <Button onClick={() => console.log("qweqweqw")} size="sm" variant="secondary">Edit</Button>
            <Button size="sm" color="red" variant="secondary">Delete</Button>
        </div>

    </div>

}
