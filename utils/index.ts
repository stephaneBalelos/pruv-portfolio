export const getRanNum = (min: number, max: number) => {
    return Math.random() * (max - min) + min
}

export const mapRange = (value: number, low1: number, high1: number, low2: number, high2: number) => {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1)
}
