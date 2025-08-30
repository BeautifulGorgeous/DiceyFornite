import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import { FC } from "react";

type HeaderProps = {
    toggleSettingsOpen: () => void,
}

export const Header:FC<HeaderProps> = ({
    toggleSettingsOpen,
}) => {
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
                Fornite Fun
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