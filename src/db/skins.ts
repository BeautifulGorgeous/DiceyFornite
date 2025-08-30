"use server";

import {prisma} from "@/db/connector";

type SkinStyle = {
    id: number,
    name: string,
}

export type Skin = {
    id: number;
    name: string;
    styles?: Array<SkinStyle>;
}

async function getSkinsList(profile: number | null): Promise<Array<Skin>> {
    const skins = await prisma.skin.findMany({
        orderBy: {
            name: "asc",
        },
        where: {
            profileId: profile,
        }
    });
    console.log("profile", profile, "skinds", skins[0])
    const skinStyles = await prisma.skinStyle.findMany();

    return skins
        .map(skin => ({
            id: skin.id,
            name: skin.name || "",
            styles: skinStyles.filter(s => s.skinId == skin.id).map(style => ({
                id: style.id,
                name: style.name || "",
            })),
        }));
}

export type Stats = {
    id: number,
    name: string | null,
    count: number,
    styles?: Array<{
        id: number,
        name: string | null,
        count: number,
    }>
}

export async function getAllSkins(profile: number | null): Promise<Array<Stats>>  {
    const skins = await getSkinsList(profile);
    const games = await prisma.game.findMany();

    return skins
        .map(skin => {
            const styleIds = Array.isArray(skin.styles) ? skin.styles.map(st => st.id) : []; 
            const relatedGames = games.filter(g => styleIds.includes(g.styleId));

            return {
                id: skin.id,
                name: skin.name,
                count: relatedGames.length,
                styles: skin?.styles?.map(st => {
                    const games = relatedGames.filter(g => g.styleId === st.id);

                    return {
                        id: st.id,
                        name: st.name,
                        count: games.length,
                    }
                }) || [],
            }
        })
        .sort((a, b) => a.count - b.count)
}

export async function getPlayedGames(skin: number) {
    const styles = await prisma.skinStyle.findMany({
        include: {
            skin: true,
        },
        where: {
            skinId: skin,
        }
    });

    const styleIds = styles.map(st => st.id);

    const games = await prisma.game.findMany({
        select: {
            styleId: true,
            played: true,
        },
        where: {
            style: {
                id: {
                    in: styleIds,
                }
            }
        }
    });

    return {
        styles,
        games,
    }
}

export async function saveSkin(skinName: string, styles: Array<string>) {
    
    const skin = await prisma.skin.create({
        data: {
            name: skinName,
        }
    })

    const stylesData = styles.map(name => ({
        name,
        skinId: skin.id,
    }));

    const result = await prisma.skinStyle.createMany({
        data: stylesData,
    })

    console.log("saveskinres", skin, result);
}
