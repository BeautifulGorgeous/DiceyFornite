"use server";
import { DefaultSettings } from "@/constants";
import {prisma} from "@/db/connector";
import { DiceGameRollStrategy, Settings } from "@/types";


export async function getSettings(): Promise<Settings> {
    const settings = await prisma.settings.findMany();

    let activeProfile: number | null = parseInt(settings.find(s => s.key === "activeProfile")?.value || "");

    if (isNaN(activeProfile)) {
        activeProfile = null;
    }

    const omitSavingData = settings.find(s => s.key === "omitSavingData")?.value === "1";
    const rollStrategy = settings.find(s => s.key === "rollStrategy")?.value;
    const rollStrategyLessThanOrEqual = settings.find(s => s.key === "rollStrategyLessThanOrEqual")?.value;

    return {
        activeProfile,
        omitSavingData: omitSavingData,
        rollStrategy: rollStrategy || DiceGameRollStrategy.All,
        rollStrategyLessThanOrEqual: typeof rollStrategyLessThanOrEqual !== "undefined" ? parseInt(rollStrategyLessThanOrEqual) : DefaultSettings.rollStrategyLessThanOrEqual,
    }
}

export async function saveSetting(key: string, value: string) {
    const existingSetting = await prisma.settings.findFirst({
        where: { key },
    });

    if (existingSetting?.id) {
        await prisma.settings.update({
            data: { value },
            where: { id: existingSetting.id },
        })
    } else {
        await prisma.settings.create({
            data: {
                key,
                value,
            }
        })
    }

    return true;
}
