import { useInterfaceLanguage } from "@/contexts/LanguageContext";
import { useGamesPlayed } from "@/helpers/useGamesPlayed";
import { FC } from "react";

export const GamesPlayed: FC = () => {
    const { skin } = useGamesPlayed();
    const {_t} = useInterfaceLanguage();

    console.log(GamesPlayed.name);

    return <div className="text-center my-2">
        {_t("Games played this skin today: {0}", [skin.today])}
        <span className="text-gray-300 ml-2">
            {_t("Total: {0}", [skin.total])}
        </span>
    </div>
}
