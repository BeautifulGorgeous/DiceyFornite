import { FC, useCallback, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Alert, Button } from "@mui/material";
import { useCurrentSkin } from "@/contexts/CurrentSkinContext";
import { useInterfaceLanguage } from "@/contexts/LanguageContext";
import { getRandomItem } from "@/helpers";

const messages = {
    error: [
        "Too bad. You roll for {0}. You gotta play 2 more games this skin",
        "You got {0}. That's too low. Play 2 more games to recreate",
    ],
    warning: [
        "Roll result: {0}",
        "Just {0}. Not too bad. But could be better.",
    ],
    success: [
        "You got {0}. Feel free to change the skin."
    ],
}

const throwDice = () => Math.max(Math.floor(Math.random() * 20), 1);

export const DiceGame:FC = ({
}) => {
    const [diceScore, setDiceScore] = useState<number | null>(null);

    const {currentSkinStyle} = useCurrentSkin();
    const {_t} = useInterfaceLanguage();

    const alertType = diceScore === null
        ? null
        : diceScore === 1
            ? "error"
            : diceScore < 13
                ? "warning"
                : "success";

    const message = alertType !== null ? getRandomItem(messages[alertType]) : null;

    const handleThrowDice = useCallback(() => {
        setDiceScore(throwDice());
    }, []);

    useEffect(() => {
        setDiceScore(null);
    }, [currentSkinStyle]);

    return <Grid className="my-2" container>
        {typeof diceScore === "number" && alertType !== null ? <Grid size={12}>                
            <Alert className="mb-3 content-center" severity={alertType || "info"}>{_t(message, [diceScore])}</Alert>
        </Grid> : null}
        <Grid size={12}>
            <Button
                className="w-full"
                disabled={currentSkinStyle === null}
                onClick={handleThrowDice}
                variant="contained"
            >
                {_t("Throw dice")}
            </Button>
        </Grid>
    </Grid>;
}
