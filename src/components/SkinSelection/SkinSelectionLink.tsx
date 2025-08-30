import { FC, useMemo } from "react";
import { Skin } from "@/db/skins";
import { useInterfaceLanguage } from "@/contexts/LanguageContext";
import { Button } from "@mui/material";

type SkinSelectionLinkProps = {
    showFull?: boolean,
    skins: Array<Skin>,
    currentStyle: number | null,
    onLinkClick: () => void,
}

export const SkinSelectionLink: FC<SkinSelectionLinkProps> = ({
    currentStyle,
    onLinkClick,
    showFull = true,
    skins,
}) => {
    const {_t} = useInterfaceLanguage();

    const selectedSkin = useMemo(() => {
        if (currentStyle === null) {
            return null;
        }

        const skin = skins.find(s => Array.isArray(s?.styles) && s.styles.some(st => st.id === currentStyle));

        return typeof skin === "undefined" ? null : skin;
    }, [currentStyle, skins]);

    const selectedSkinName = useMemo(() => selectedSkin?.name || null, [selectedSkin]);
    const selectedStyleName = useMemo(() => selectedSkin?.styles?.find(s => s.id === currentStyle)?.name || null, [selectedSkin, currentStyle]);

    const buttonString = currentStyle === null
         ? "No skin selected"
         : showFull && selectedSkinName !== selectedStyleName
            ? "Selected {0} with style {1}"
            : "Selected {0}";

    return <Button
        className="text-center d-flex w-full"
        variant="text"
        onClick={onLinkClick}
    >
        {_t(buttonString, [selectedSkinName, selectedStyleName])}            
    </Button>
}
