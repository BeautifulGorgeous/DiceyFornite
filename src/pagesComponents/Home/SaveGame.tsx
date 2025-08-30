import { ChangeEvent, FC, useCallback, useState } from "react";
import { Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useCurrentSkin } from "@/contexts/CurrentSkinContext";
import { useGamesPlayed } from "@/helpers/useGamesPlayed";
import { useInterfaceLanguage } from "@/contexts/LanguageContext";

export const SaveGame: FC = () => {
    const [loading, setLoading] = useState(false);
    const [position, setPosition] = useState<number | null>(null);

    const {_t} = useInterfaceLanguage();
    const {logGame} = useGamesPlayed();
    const {currentSkinStyle} = useCurrentSkin();

    const handlePositionChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPosition(parseInt(event.currentTarget?.value));
    }, []);

    const handleAddGame = useCallback(async () => {
        setLoading(true);
        await logGame(position);
        setPosition(null);
        setLoading(false);
    }, [position, logGame]);

    return ( 
        <Grid container spacing={2} size={12}>
            <Grid
                size={4}
                style={{
                    height: "36px",
                }}
            >
                <TextField
                    className="w-full"
                    type="number"
                    onChange={handlePositionChange}
                    value={position || 0}
                    size="small"
                    label={_t("Position")}
                />
            </Grid>
            <Grid size={8}>
                <Button
                    className="w-full"
                    disabled={loading || currentSkinStyle === null}
                    onClick={handleAddGame}
                    variant="outlined"
                >
                    {_t("Save game")}
                </Button>
            </Grid>
        </Grid>
    );
}
