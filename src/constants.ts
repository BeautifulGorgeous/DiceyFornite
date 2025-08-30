import { DiceGameRollStrategy, Settings } from "./types"


export const DefaultSettings:Settings = {
    omitSavingData: false,
    rollStrategy: DiceGameRollStrategy.All,
    rollStrategyLessThanOrEqual: 2,
}
