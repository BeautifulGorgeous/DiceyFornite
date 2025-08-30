"use client";

import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import ru from "@/strings/ru.json";

const LanguageContext = createContext("ru");

type LanguageContextProviderProps = {
    children: ReactNode,
}

export const LanguageContextProvider = ({children}: LanguageContextProviderProps) => {
    const [lang] = useState("ru");

    return <LanguageContext.Provider value={lang}>
        {children}
    </LanguageContext.Provider>
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const translateString = (dictionary: any) => (string: string, params: Array<any> | null = null) => {
    if (dictionary === null) {
        return null;
    }

    let translated = dictionary[string] ? dictionary[string] : string;

    if (params !== null && params.length > 0) {
        params.forEach((p, idx) => {
            if (typeof p === "string" || typeof p === "number") {
                translated = translated.replace(`\{${idx}\}`, p.toString());
            }
        });
    }

    return translated;
}

export const useInterfaceLanguage = () => {
    const value = useContext(LanguageContext);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const _t = useCallback(translateString(value === "ru" ? ru : null), [value]);

    return {
        _t,
        lang: value,
    }
}
