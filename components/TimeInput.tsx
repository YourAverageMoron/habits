import { TextInput } from "@tremor/react";
import { useState } from "react";

export default function TimeInput() {
    const [value, setValue] = useState("00:00")

    const setTimeValue = (inputValue: string) => {
        let splitValue = inputValue.split(":");
        let numHours = +splitValue[0]
        let numMinutes = +splitValue[1]
        if (numHours < 0 || numHours > 24 || numMinutes < 0 || numMinutes > 60) {
            return;
        }

        setValue(inputValue);
    }

    return <>
        <div>
            <TextInput placeholder="Search..." value={value} onValueChange={setTimeValue} />
        </div>
    </>
}
