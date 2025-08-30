import { useSettings } from "@/contexts/SettingsContext"
import { Button, ButtonGroup, FormControl, FormGroup, TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ChangeEvent, useCallback, useState } from "react";
import { useProfiles } from "./useProfiles";
import { useInterfaceLanguage } from "@/contexts/LanguageContext";

const LABEL_ID = "profile-selection-select-label";

const EDITING_PROFILE_MODES = {
    NONE: "none",
    ADDING: "adding",
    RENAMING: "renaming",
}

export const ProfileSelection = () => {
    const [editingProfile, setEditingProfile] = useState(EDITING_PROFILE_MODES.NONE);
    const [editingProfileName, setEditingProfileName] = useState("");
    const {addProfile, deleteProfile, profiles, renameProfile} = useProfiles();
    const {activeProfile, setActiveProfile} = useSettings();
    const {_t}= useInterfaceLanguage();

    const _activeProfile = typeof activeProfile === "number" ? activeProfile?.toString() : profiles[0]?.id?.toString() || "";

    const handleChangeActiveProfile = useCallback((event: SelectChangeEvent) => {
        const selectedProfileId = parseInt(event?.target?.value);
        if (typeof selectedProfileId === "number") {
            setActiveProfile(selectedProfileId);
        }
    }, [setActiveProfile]);

    const handleAddingProfile = useCallback(() => {
        setEditingProfile(EDITING_PROFILE_MODES.ADDING);
        setEditingProfileName("");
    }, []);

    const handleRenaimingProfile = useCallback(() => {
        setEditingProfile(EDITING_PROFILE_MODES.RENAMING);
        setEditingProfileName(typeof activeProfile === "number" ? profiles.find(p => p.id === activeProfile)?.name || "" : "");
    }, [activeProfile, profiles]);

    const handleDeleteProfile = useCallback(() => {
        if (typeof activeProfile === "number") {
            deleteProfile(activeProfile);
        }
        setEditingProfile(EDITING_PROFILE_MODES.NONE);
        setEditingProfileName("");
    }, [activeProfile, deleteProfile]);

    const handleCancelEditing = useCallback(() => {
        setEditingProfile(EDITING_PROFILE_MODES.NONE);
        setEditingProfileName("");
    }, []);

    const handleChangeProfileName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setEditingProfileName(event?.target?.value || "");
    }, []);

    const handleSaveProfile = useCallback(() => {
        if (editingProfileName.length > 0) {
            if (editingProfile === EDITING_PROFILE_MODES.ADDING) {
                addProfile(editingProfileName);
            } else if (editingProfile === EDITING_PROFILE_MODES.RENAMING) {
                if (typeof activeProfile === "number") {
                    renameProfile(activeProfile, editingProfileName);
                }
            }
        }
        setEditingProfile(EDITING_PROFILE_MODES.NONE);
        setEditingProfileName("");
    }, [addProfile, editingProfile, editingProfileName, renameProfile]);

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
        <ButtonGroup>
            <Button
                onClick={handleAddingProfile}
                variant="text"
            >
                {_t("Add profile")}
            </Button>
            <Button
                onClick={handleRenaimingProfile}
                variant="text"
            >
                {_t("Rename profile")}
            </Button>
            <Button
                onClick={handleDeleteProfile}
                variant="text"
            >
                {_t("Delete profile")}
            </Button>

        </ButtonGroup>
        { [ EDITING_PROFILE_MODES.ADDING, EDITING_PROFILE_MODES.RENAMING ].includes(editingProfile) ? <FormGroup className="my-2">
            <TextField
                id="editing-profile-name"
                label={_t("Profile name")}
                onChange={handleChangeProfileName}
                value={editingProfileName}
                variant="outlined"
            />
            <ButtonGroup
                className="w-100"
                sx={{
                    mt: 1,
                    width: "100%",
                }}
            >
                <Button
                    className="flex-1"
                    onClick={handleSaveProfile}
                    sx={{
                        mr: 2,
                    }}
                    variant="contained"
                >
                    {_t("Save")}
                </Button>
                <Button
                    onClick={handleCancelEditing}
                    variant="text"
                >
                    {_t("Cancel")}
                </Button>


            </ButtonGroup>
        </FormGroup> : null }
    </FormGroup>
}
