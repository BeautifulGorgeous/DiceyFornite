"use client";

import { DefaultSettings } from "@/constants";
import { getSettings, saveSetting } from "@/db/settings";
import { DiceGameRollStrategy, Settings } from "@/types";
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

type SettingsContextType = {
    activeProfile: number | null,
    omitSavingData: boolean | null,
    rollStrategy: string | null,
    rollStrategyLessThanOrEqual: number,
    loading: boolean,
    setActiveProfile: (profile: number) => void,
    setRollStrategy: (strategy: string) => void,
    setRollStrategyLessThanOrEqualThreshold: ((thershold: string) => void),
}

const SettingsContext = createContext<SettingsContextType>({
    ...DefaultSettings,
    loading: true,
    setActiveProfile: () => {},
    setRollStrategy: () => {},
    setRollStrategyLessThanOrEqualThreshold: () => {},
})

type SettingsContextProviderProps = {
    children: ReactNode,
}

export const SettingsContextProvider = ({children}: SettingsContextProviderProps) => {
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState<Settings>(DefaultSettings);

    const fetchSettings = useCallback(async () => {
        setLoading(true);
        const st = await getSettings();
        setSettings(st);
        setLoading(false);
    }, []);

    const updateSetting = useCallback(async (key: string, value: string) => {
        setLoading(true);
        await saveSetting(key, value);
        fetchSettings();
    }, []);

    const setActiveProfile = useCallback(async (value: number) => {
        updateSetting("activeProfile", value?.toString())
    }, [updateSetting]);

    const setRollStrategy = useCallback(async (value: string) => {
        updateSetting("rollStrategy", value)
    }, [updateSetting]);

    const setRollStrategyLessThanOrEqualThreshold = useCallback(async (value: string) => {
        updateSetting("rollStrategyLessThanOrEqual", value)
    }, [updateSetting]);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    return <SettingsContext.Provider
        value={ {
            ...settings,
            loading,
            setActiveProfile,
            setRollStrategy,
            setRollStrategyLessThanOrEqualThreshold,
        } }
    >
        {children}
    </SettingsContext.Provider>
};

export const useSettings = () => {
    const value = useContext(SettingsContext);

    return value;
}
