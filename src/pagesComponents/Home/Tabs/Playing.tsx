import SkinSelection from "@/components/SkinSelection";
import { StatsSection } from "@/components/StatsSection";
import {Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
    FC,
} from "react";
import { GamesPlayed } from "../GamesPlayed";
import { GameOptions } from "../GameOptions";
import { SaveGame } from "../SaveGame";
import { DiceGame } from "../DiceGame";

export const PlayingTab:FC = () => {
    return <>
        <Grid container spacing={2} className="mx-auto" style={{
            width: "500px",
        }}>
            <Grid size={12} className="mt-2">
                <SkinSelection/>
            </Grid>
            <Grid size={12}>
                <GamesPlayed/>
                <SaveGame/>
                <DiceGame/>
                <Stack spacing={2} direction="column">
                    <Grid size={12}>                    
                        <GameOptions/>
                    </Grid>
                </Stack>
            </Grid>
        </Grid>
        <Grid container spacing={2} className="mx-auto" sx={{
            mt: 4,
            width: "500px",
        }}>
            <Grid size={12}>
                <StatsSection/>
            </Grid>
        </Grid>
    </>
}
