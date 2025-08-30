
export const DiceGameRollStrategy = {
    All: "0",
    LessThanOrEqual: "1",
}

export type Settings = {
    activeProfile: number | null,
    omitSavingData: boolean,
    rollStrategy: string,
    rollStrategyLessThanOrEqual: number,
}
