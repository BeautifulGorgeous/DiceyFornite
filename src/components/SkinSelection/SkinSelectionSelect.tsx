import { FC, useCallback, useMemo } from "react"
import { Skin } from "@/db/skins";
import { Autocomplete, createFilterOptions, TextField } from "@mui/material";


type SkinSelectionSelectProps = {
    skins: Array<Skin>,
    currentStyle: number | null,
    setCurrentSkin: (skin: number | null, style: number | null) => void,
}

type SkinRemapped = {
    id: number,
    name: string | null,
    skinId: number,
    skinName: string | null,
}

export const SkinSelectionSelect: FC<SkinSelectionSelectProps> = ({
    skins,
    currentStyle,
    setCurrentSkin,
}) => {
    const skinsRemapped = useMemo(() =>
        skins.reduce<Array<SkinRemapped>>((acc, curr) => {
            return acc.concat(!curr?.styles || curr.styles?.length === 0 ? [] : curr.styles.map(st => ({
                id: st.id,
                name: st?.name || "",
                skinId: curr.id,
                skinName: curr.name,
            })))
        }, []),
        [skins],
    );

    const selectedValue = useMemo(() => skinsRemapped.find(sr => sr.id === currentStyle) || null, [skinsRemapped, currentStyle]);

    const filterOptions = createFilterOptions({
        trim: true,
        stringify: (option: SkinRemapped) => `${option.skinName} ${option.name}`,
    })

    const handleChange = useCallback((_: unknown, item: SkinRemapped | null) => {
        setCurrentSkin(item?.skinId || null, item?.id || null);
    }, [setCurrentSkin]);

    return <Autocomplete
        filterOptions={filterOptions}
        getOptionLabel={(option) => option?.name || ""}
        groupBy={option => option.skinName || ""}
        renderInput={(params) => <TextField {...params}/>}
        onChange={handleChange}
        options={skinsRemapped}
        value={selectedValue}
    />;
}
