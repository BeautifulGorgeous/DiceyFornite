import { FC, useCallback, useState } from "react"
import { useCurrentSkin } from "@/contexts/CurrentSkinContext";
import { SkinSelectionSelect } from "./SkinSelectionSelect";
import { SkinSelectionLink } from "./SkinSelectionLink";
import { useSkins } from "@/contexts/SkinsContext";

export const SkinSelection: FC = () => {
    const {skins} = useSkins();
    const [openDialog, setOpenDialog] = useState(false);
    const {currentSkinStyle, setCurrentSkin} = useCurrentSkin();

    const handleOpenDialog = useCallback(() => {
        setOpenDialog(true);
    }, []);

    const handleChangeCurrentSkin = useCallback((skin: number | null, style: number | null) => {
        setCurrentSkin(skin, style);
        setOpenDialog(false);
    }, [setCurrentSkin]);

    return (
        <>
            {!openDialog ? <SkinSelectionLink
                skins={skins}
                currentStyle={currentSkinStyle}
                onLinkClick={handleOpenDialog}
            /> : null}
            {openDialog ? <SkinSelectionSelect
                skins={skins}
                currentStyle={currentSkinStyle}
                setCurrentSkin={handleChangeCurrentSkin}
            /> : null}
        </>
    )
}

export default SkinSelection;
