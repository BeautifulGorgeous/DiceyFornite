import { useCurrentSkin } from "@/contexts/CurrentSkinContext";
import { useInterfaceLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/contexts/SettingsContext";
import { useSkins } from "@/contexts/SkinsContext";
import { DiceGameRollStrategy } from "@/types";
import { Button } from "@mui/material";
import { FC, useCallback } from "react";


const getNext = (items: Array<number>, current: number | null) => {
    let curr = null;
    const crr = items.find(i => i === current);

    if (typeof crr !== "undefined") {
        curr = crr;
    }

    const next = getNext2(items.length, curr);

    const outcome = items[next];

    return outcome || null;
}

const getNext2 = (max: number, current: number | null) => {
    const next = Math.floor(Math.random() * max);

    if (current && next === current) {
        return getNext2(max, current);
    }

    return next;
}

export const GameOptions:FC = () => {
    const {skin, setCurrentSkin} = useCurrentSkin();
    const {_t} = useInterfaceLanguage();
    const {skins} = useSkins();
    const {
        rollStrategyLessThanOrEqual,
        rollStrategy,
    } = useSettings();

    const handleGetNewCharacter = useCallback(() => {
        const skinsFiltered = skins.filter(s => {
            switch(rollStrategy) {
                case DiceGameRollStrategy.LessThanOrEqual:
                    if (typeof rollStrategyLessThanOrEqual === "string") {
                        return s.count <= parseInt(rollStrategyLessThanOrEqual);
                    } else {
                        return s.count <= 1;
                    }
                default:
                    return true;
            }
        })
        const skinIds = skinsFiltered.map(s => s.id);
        const nextSkinId = getNext(skinIds, skin);

        const nextSkin = skinsFiltered.find(s => s.id === nextSkinId);

        if (typeof nextSkin !== "undefined") {
            const possibleStyles = nextSkin?.styles;

            if (Array.isArray(possibleStyles) && possibleStyles.length > 0) {
                const styleIds = possibleStyles.map(s => s.id);

                const nextStyleId = getNext(styleIds, null);

                setCurrentSkin(nextSkinId, nextStyleId);
            }
        }
    }, [rollStrategyLessThanOrEqual, rollStrategy, setCurrentSkin, skins, skin]);

    return <>    
        <Button
            className="w-full mt-2"
            onClick={handleGetNewCharacter}
            variant="text"
        >
            {_t("Get another skin")}
        </Button>
    </>;
}
