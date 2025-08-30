import {
    FC,
    useState,
} from "react";
import { Tabs, Tab } from "@mui/material";
import { withHeader } from "@/components/Header/withHeader";
import { useInterfaceLanguage } from "@/contexts/LanguageContext";
import { PlayingTab } from "./Tabs/Playing";
import { AddingSkinTab } from "./Tabs/AddingSkin";

export const HomeView:FC = () => {
    const [currentTab, setCurrentTab] = useState("1");
    const {_t} = useInterfaceLanguage();

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    }

    return <>
        {/* <Tabs
            onChange={handleTabChange}
            value={currentTab}
        >
            <Tab
                label={_t("Playing")}
                value="1"
            />
            <Tab
                label={_t("Adding skin")}
                value="2"
            />
        </Tabs> */}
        {currentTab === "1" ? <PlayingTab/> : null}
        {/* {currentTab === "2" ? <AddingSkinTab/> : null} */}
    </>
}

export const Home = withHeader(HomeView);
