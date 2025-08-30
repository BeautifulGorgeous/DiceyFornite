import { useInterfaceLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/contexts/SettingsContext";
import { DiceGameRollStrategy } from "@/types";
import { Checkbox, Divider, Drawer, FormControlLabel, FormGroup, IconButton, TextField } from "@mui/material";
import { ChangeEvent, FC, useCallback } from "react";
import { DrawerHeader } from "./DrawerHeader";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

type AppBarDrawerProps = {
    closeSettings: () => void,
    open: boolean,
}

export const AppBarDrawer:FC<AppBarDrawerProps> = ({
    closeSettings,
    open,
}) => {
    const {
        rollStrategyLessThanOrEqual,
        rollStrategy,
        setRollStrategyLessThanOrEqualThreshold,
        setRollStrategy,
    } = useSettings();
    const { _t } = useInterfaceLanguage();

    const handleChangeRollStrategy = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (typeof setRollStrategy === "function") {
            setRollStrategy(event.target.checked ? DiceGameRollStrategy.LessThanOrEqual : DiceGameRollStrategy.All);
        }
    }, [ setRollStrategy ]);

    const handleChangeThreshold = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (typeof setRollStrategyLessThanOrEqualThreshold === "function") {
            setRollStrategyLessThanOrEqualThreshold(event.target?.value || "1");
        }
    }, [ setRollStrategyLessThanOrEqualThreshold ]);

    return (
        <Drawer
            anchor="right"
            open={open}
            variant="persistent"
        >
            <DrawerHeader>
                <IconButton  onClick={closeSettings}>
                    <ChevronRightIcon/>
                </IconButton>
            </DrawerHeader>
            <Divider/>
            <FormGroup
                sx={{
                    px: 2,
                    width: "300px",
                }}
            >
                <FormControlLabel
                    control={ <Checkbox checked={ rollStrategy === DiceGameRollStrategy.LessThanOrEqual } onChange={ handleChangeRollStrategy } /> }
                    label={ _t("Prefer skins with less or equal amount of games") }
                />
                <TextField
                    className="w-full m-2"
                    type="number"
                    onChange={handleChangeThreshold}
                    value={rollStrategyLessThanOrEqual}
                    size="small"
                    label={_t("Not more than X games")}
                />
            </FormGroup>
            <Divider/>

        </Drawer>
    );
}
