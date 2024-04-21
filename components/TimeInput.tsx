import { TextInput, TextInputProps } from "@tremor/react";


export const timeValidation = (value: string | undefined) => {
    return value ? !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value) : false;
}



export function TimeInput(props: TextInputProps) {
    return <TextInput error={timeValidation(props.value)} {...props} />

}
