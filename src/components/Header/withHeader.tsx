"use client";
import { Box, CssBaseline } from "@mui/material";
import { useCallback, useState } from "react";
import { Header } from ".";
import { AppBarDrawer } from "../AppBar/AppBarDrawer";
import { DrawerHeader } from "../AppBar/DrawerHeader";

export const withHeader = (WrappedComponent: any) => {
    return (props: any) => {
        const [settingsOpen, setSettingsOpen] = useState(false);
    
        const toggleSettingsOpen = useCallback(() => setSettingsOpen(curr => !curr), []);
        const closeSettings = useCallback(() => setSettingsOpen(false), []);
    
        return <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <CssBaseline/>
            <Header toggleSettingsOpen={toggleSettingsOpen}/>
            <DrawerHeader/>
            <WrappedComponent {...props}/>
            <AppBarDrawer
                closeSettings={closeSettings}
                open={settingsOpen}
            />
        </Box>

    }
}
