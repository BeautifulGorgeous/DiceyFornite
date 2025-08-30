import { useCurrentSkin } from "@/contexts/CurrentSkinContext";
import { useCallback, useEffect, useState } from "react";
import { saveGame } from "@/db/games";
import { getPlayedGames } from "@/db/skins";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import { useSettings } from "@/contexts/SettingsContext";

dayjs.extend(isToday);

type GamesPlayedSkin = {
    id: number,
}

type GamesPlayedPart = {
    today: number,
    total: number,
}

type GamesPlayedStat = {
    skin: GamesPlayedPart,
    styles: Array<GamesPlayedPart & GamesPlayedSkin>,
}

type GamesPlayedFunctions  = {
    logGame: (position: number | null) => Promise<void>,
}

type GamesPlayed = GamesPlayedStat & GamesPlayedFunctions;

export const updateEvent = "upd-played-games";

export const useGamesPlayed = (): GamesPlayed => {

    const {currentSkinStyle, skin: currentSkin} = useCurrentSkin();
    const {omitSavingData} = useSettings();
    const [stats, setStats] = useState<GamesPlayedStat>({
        skin: {
            today: 0,
            total: 0,
        },
        styles: [],
    });

    const loadGamesPlayed = useCallback(async () => {
        if (currentSkin !== null && currentSkinStyle !== null) {
            const { styles, games } = await getPlayedGames(currentSkin);
            
            const todayGames = games.filter(g => dayjs(g.played).isToday());

            setStats({
                skin: {
                    today: todayGames.length,
                    total: games.length,
                },
                styles: styles.map(st => ({
                    id: st.id,
                    total: games.filter(g => g.styleId === st.id).length,
                    today: todayGames.filter(g => g.styleId == st.id).length,
                })),
            });
        }
    }, [currentSkin, currentSkinStyle]);

    const logGame = useCallback(async (position: number | null) => {
        if (!omitSavingData) {
            await saveGame(currentSkinStyle, new Date(), position);
        }
        window.dispatchEvent(new Event(updateEvent));
    }, [currentSkinStyle, omitSavingData]);

    useEffect(() => {
        loadGamesPlayed();
    }, [loadGamesPlayed]);

    useEffect(() => {
        const updateListener = () => {
            loadGamesPlayed();
        }
        window.addEventListener(updateEvent, updateListener as EventListener);

        return () => {
            window.removeEventListener(updateEvent, updateListener as EventListener);
        }
    }, [loadGamesPlayed]);

    return {
        logGame,
        ...stats,
    }
}
