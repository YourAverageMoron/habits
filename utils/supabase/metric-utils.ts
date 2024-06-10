
export function timeInMin(time: string): number {
    let splitTime = time.split(':');
    return (Number(splitTime[0]) * 60) + Number(splitTime[1]) + (Number(splitTime[2]) / 60)
}

