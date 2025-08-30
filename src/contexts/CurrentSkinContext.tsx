"use client";

import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from "react";

type CurrentSkinContextType = {
    skin: number | null,
    currentSkinStyle: number | null,
    setCurrentSkin: (skin: number | null, style: number | null) => void,
}

const CurrentSkinContext = createContext<CurrentSkinContextType>({
    skin: null,
    currentSkinStyle: null,
    setCurrentSkin: () => null,
})

type CurrentSkinContextProviderProps = {
    children: ReactNode,
}

export const CurrentSkinContextProvider = ({children}: CurrentSkinContextProviderProps) => {
    const [currentSkin, setCurrentSkin] = useState<number | null>(null);
    const [currentStyle, setCurrentStyle] = useState<number | null>(null);
  
    const handleChangeCurrentSkin = useCallback((skin: number | null, currentSkinStyle: number | null) => {
      setCurrentSkin(skin);
      setCurrentStyle(currentSkinStyle);
    }, []);        

    return <CurrentSkinContext.Provider
        value={ {
            skin: currentSkin,
            currentSkinStyle: currentStyle,
            setCurrentSkin: handleChangeCurrentSkin,
        } }
    >
        {children}
    </CurrentSkinContext.Provider>
};

export const useCurrentSkin = () => {
    const value = useContext(CurrentSkinContext);

    return value;
}
