import { useCallback, useEffect, useState } from "react";
import { addProfile, deleteProfile, getProfiles, renameProfile } from "@/db/profiles";

export const FORCE_UPDATE_PROFILES_EVENT_NAME = "forceUpdateProfiles";

export const useProfiles = () => {
    const [profiles, setProfiles] = useState<Array<any>>([]);
    const [loading, setLoading] = useState(false);

    const laodProfiles = useCallback(async () => {
        setLoading(true);
        const accs = await getProfiles();
        setProfiles(accs);
    }, []);

    const _addProfile = useCallback(async (name: string) => {
        setLoading(true);
        await addProfile(name);
        await laodProfiles();
        setLoading(false);
    }, [laodProfiles]);

    const _deleteProfile = useCallback(async (id: number) => {
        setLoading(true);
        await deleteProfile(id);
        await laodProfiles();
        setLoading(false);
    }, [laodProfiles]);

    const _renameProfile = useCallback(async (id: number, name: string) => {
        setLoading(true);
        await renameProfile(id, name);
        await laodProfiles();
        setLoading(false);
    }, [laodProfiles]);

    useEffect(() => {
        window.addEventListener(FORCE_UPDATE_PROFILES_EVENT_NAME, laodProfiles);

        laodProfiles();

        return () => {
            window.removeEventListener(FORCE_UPDATE_PROFILES_EVENT_NAME, laodProfiles);
        }
    }, [ laodProfiles ]);

    return {
        addProfile: _addProfile,
        deleteProfile: _deleteProfile,
        loading,
        profiles,
        renameProfile: _renameProfile,
    };
}
