import { useCallback, useEffect, useState } from "react"

export const useLocalStorageState = (localStorageKey: string, defaultValue:string = "") => {
    const [ value, setValue ] = useState(defaultValue);

    const handleSetValue = useCallback((newValue: string) => {
        localStorage.setItem(localStorageKey, newValue);
        setValue(newValue);
    }, []);

    useEffect(() => {
        setValue(localStorage.getItem(localStorageKey) || "");
    }, [ localStorageKey ]);

    return [
        value,
        handleSetValue,
    ];
}
