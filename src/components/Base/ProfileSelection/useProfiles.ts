import { getProfiles } from "@/db/profiles";
import { useEffect, useState } from "react"

export const useProfiles = () => {
    const [profiles, setProfiles] = useState<Array<any>>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const laodProfiles = async () => {
            setLoading(true);
            const accs = await getProfiles();
            setProfiles(accs);
        }

        laodProfiles();
    }, [ getProfiles ]);

    return {
        loading,
        profiles,
    };
}
