import { useInterfaceLanguage } from "@/contexts/LanguageContext";
import { saveSkin } from "@/db/skins";
import { Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ChangeEvent, FC, useCallback, useMemo, useState } from "react";

export const AddingSkinTab:FC = () => {
    const [skinName, setSkinName] = useState("");
    const [styles, setStyles] = useState<Array<string>>([]);
    
    const {_t} = useInterfaceLanguage();

    const handleSkinNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSkinName(event?.currentTarget?.value || "");
        setStyles(curr => curr.length ? curr : [""]);
    }, []);

    const handleStyleNameChange = useCallback((id: number) => (event: ChangeEvent<HTMLInputElement>) => {
        //const id = 0;
        setStyles(curr => {
            const dist = [ ...curr ];
            dist[id] = event?.currentTarget?.value || "";

            return dist;
        })
    }, []);

    const handleAddSkinStyle = useCallback(() => {
        setStyles(curr => curr.concat([""]));
    }, []);

    const handleSaveSkin = useCallback(async () => {
        await saveSkin(skinName, styles);
        setSkinName("")
        setStyles([]);
        window.dispatchEvent(new Event("upd-played-games"));
    }, [skinName, styles]);

    const saveSkinAvailable = useMemo(() => [skinName].concat(styles || []).filter(x => x.length >= 3).length === styles.length + 1, [skinName, styles]);

    return <>
        <Grid container spacing={2} className="mx-auto" style={{ width: "500px" }}>
            <Grid size={12} className="mt-2">
                <TextField
                    className="w-full"
                    label={_t("Skin name")}
                    onChange={handleSkinNameChange}
                    size="medium"
                    type="text"
                    value={skinName}
                />
            </Grid>
            <Grid size={12} className="mt-2">
                { styles.map((s, idx) => <TextField
                    className="mt-1 w-full"
                    data-id={idx}
                    key={idx}
                    label={_t(`Style ${idx + 1}`)}
                    onChange={handleStyleNameChange(idx)}
                    size="medium"
                    type="text"
                    value={s}
                /> ) }
                { styles.length > 0 ? <Button
                    className="w-full mt-1"
                    onClick={handleAddSkinStyle}
                    variant="outlined"
                >
                    {_t("Add skin style")}
                </Button> : null }
            </Grid>
            { saveSkinAvailable ? <Grid size={12}>
                <Button
                    className="w-full mt-1"
                    onClick={handleSaveSkin}
                    variant="contained"
                >
                    {_t("Save skin")}
                </Button>
            </Grid> : null }
        </Grid>
    </>
}
