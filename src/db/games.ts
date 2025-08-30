"use server";
import {prisma} from "@/db/connector";

export async function saveGame(skinStyleId: number | null, played: Date = new Date(), position: number | null) {
    if (typeof skinStyleId === "number") {
        const result = await prisma.game.create({
            data: {
                played,
                position,
                styleId: skinStyleId,
            }
        })
        console.log(2, result);
    }
}


export async function saveGameMultiple(skinStyleId: number | null, played: Date = new Date(), amount: number | null) {
    if (typeof skinStyleId === "number") {
        const data = new Array(amount || 1).fill({
            played,
            styleId: skinStyleId,
        });

        const result = await prisma.game.createMany({
            data,
        })
        console.log(2, result);
    }
}

export async function getLastGame() {
    const game = await prisma.game.findFirst({
        orderBy: {
            "createdAt": "desc",
        }
    });

    const skin = await prisma.skinStyle.findFirst({
        where: {
            id: game?.styleId,
        }
    })

    return {
        skinId: skin?.id,
        styleId: game?.styleId,
    };
}
