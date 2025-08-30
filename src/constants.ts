import { DiceGameRollStrategy, Settings } from "./types"


export const DefaultSettings: Settings = {
    activeProfile: null,
    omitSavingData: false,
    rollStrategy: DiceGameRollStrategy.All,
    rollStrategyLessThanOrEqual: 2,
}
