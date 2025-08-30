
export const DiceGameRollStrategy = {
    All: "0",
    LessThanOrEqual: "1",
}

export type Settings = {
    omitSavingData: boolean,
    rollStrategy: string,
    rollStrategyLessThanOrEqual: number,
}
