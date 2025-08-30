/* eslint-disable @typescript-eslint/no-explicit-any, react/display-name */

import { getAllSkins, Stats } from "@/db/skins";
import { useCallback, useEffect, useState } from "react";

export const withSkins = (WrappedComponent: any) => {
    return (props: any) => {
        const [skins, setSkins] = useState<Array<Stats>>([]);
        const [loading, setLoading] = useState(false);

        const fetchSkins = useCallback(async () => {
            setLoading(true);
            setSkins(await getAllSkins());
            setLoading(false);
        }, []);
    
        useEffect(() => {
            fetchSkins();
        }, [fetchSkins]);

        return <WrappedComponent
            skins={skins}
            skinsLoading={loading}
            {...props}
        />
    }
}
