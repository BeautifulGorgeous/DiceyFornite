"use client";

import { getAllSkins, Stats } from "@/db/skins";
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { useSettings } from "./SettingsContext";

type SkinsContextType = {
    loading: boolean,
    skins: Array<Stats>,
    updateSkins: () => void,
}

const SkinsContext = createContext<SkinsContextType>({
    loading: false,
    skins: [],
    updateSkins: () => {},
})

type SkinsContextProviderProps = {
    children: ReactNode,
}

export const SkinsContextProvider = ({children}: SkinsContextProviderProps) => {
    const [skins, setSkins] = useState<Array<Stats>>([]);
    const [loading, setLoading] = useState(false);
    const {activeProfile} = useSettings();

    const fetchSkins = useCallback(async () => {
        setLoading(true);
        setSkins(await getAllSkins(activeProfile));
        setLoading(false);
    }, [activeProfile]);

    useEffect(() => {
        fetchSkins();
    }, [fetchSkins]);

    const updateSkins = useCallback(() => {
        fetchSkins();
    }, [fetchSkins]);

    return <SkinsContext.Provider
        value={ {
            loading,
            skins,
            updateSkins,
        } }
    >
        {children}
    </SkinsContext.Provider>
};

export const useSkins = () => {
    const value = useContext(SkinsContext);

    return value;
}
