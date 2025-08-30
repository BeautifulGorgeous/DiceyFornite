import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import { FC } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { useProfiles } from "../Base/ProfileSelection/useProfiles";

type HeaderProps = {
    toggleSettingsOpen: () => void,
}

export const Header:FC<HeaderProps> = ({
    toggleSettingsOpen,
}) => {
    const { activeProfile } = useSettings();
    const { profiles } = useProfiles();


    const activeProfileName = profiles.find(p => p.id === activeProfile)?.name || null;

    return <AppBar
        position="fixed"
    >
        <Toolbar>
            <Typography
                component="div"
                noWrap
                sx={{
                    flexGrow: 1,
                }}
                variant="h6"
            >
                Dicey Fortnite { activeProfileName ? ` - ${activeProfileName}` : null }
            </Typography>
            <IconButton
                color="inherit"
                aria-label="toggle-settings-open"
                edge="end"
                onClick={ toggleSettingsOpen }
            >
                <SettingsIcon/>
            </IconButton>
        </Toolbar>
    </AppBar>
};