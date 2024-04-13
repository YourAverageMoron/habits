import { TextInput, TextInputProps } from "@tremor/react";

export default function TimeInput(props: TextInputProps) {
    const timeValidation = () => {
        return props.value ? !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(props.value) : false;
    }

    return <TextInput error={timeValidation()} {...props} />

}
