import { useSettings } from "@/contexts/SettingsContext"
import { FormControl, FormGroup } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useCallback } from "react";
import { useProfiles } from "./useProfiles";
import { useInterfaceLanguage } from "@/contexts/LanguageContext";

const LABEL_ID = "profile-selection-select-label";

export const ProfileSelection = () => {
    const {profiles} = useProfiles();
    const {activeProfile, setActiveProfile} = useSettings();
    const {_t}= useInterfaceLanguage();

    const _activeProfile = typeof activeProfile === "number" ? activeProfile?.toString() : profiles[0]?.id?.toString() || "";

    const handleChangeActiveProfile = useCallback((event: SelectChangeEvent) => {
        const selectedProfileId = parseInt(event?.target?.value);
        if (typeof selectedProfileId === "number") {
            setActiveProfile(selectedProfileId);
        }
    }, [setActiveProfile]);

    return <FormGroup
        sx={{
            mb: 2,
            px: 2,
            width: "300px",
        }}
    >
        <FormControl>
            <InputLabel id={LABEL_ID}>{_t("Active profile")}</InputLabel>
            <Select
                id="profile-selection-select"
                label={_t("Active profile")}
                labelId={LABEL_ID}
                onChange={handleChangeActiveProfile}
                value={_activeProfile}
            >
                { profiles?.map(profile => <MenuItem
                    key={profile.id}
                    value={profile.id.toString()}
                >
                    {profile.name}
                </MenuItem>) }
            </Select>
        </FormControl>
    </FormGroup>
}
