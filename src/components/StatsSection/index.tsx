import { Box, Collapse, FormControl, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Input, InputAdornment, OutlinedInput, Button} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { ChangeEvent, FC, useCallback, useEffect, useMemo, useReducer, useState } from "react"

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getAllSkins, Stats } from "@/db/skins";
import { updateEvent } from "@/helpers/useGamesPlayed";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useInterfaceLanguage } from "@/contexts/LanguageContext";
import { numWords } from "@/helpers";
import { useSettings } from "@/contexts/SettingsContext";


const chartXLabels = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

export const StatsSection: FC = () => {
    const [stats, setStats] = useState<Array<Stats>>([]);
    const [search, setSearch] = useState<string | null>(null);
    const [expanded, setExpanded] = useState(false);
    const {activeProfile} = useSettings();

    const { _t } = useInterfaceLanguage();

    const fetchStats = useCallback(async () => {
        setStats(await getAllSkins(activeProfile));
    }, [activeProfile]);

    const handleExpand = useCallback(() => setExpanded(true), []);

    useEffect(() => {
        fetchStats()
    }, [fetchStats]);

    useEffect(() => {
        window.addEventListener(updateEvent, fetchStats as EventListener);

        return () => {
            window.removeEventListener(updateEvent, fetchStats as EventListener);
        }
    }, [fetchStats]);

    const filteredStats = useMemo(() => stats.filter(s => s.styles?.map(st => st.name).concat(s.name).some(n => n?.toLowerCase().includes((search || "").toLowerCase()))), [stats, search]);

    const statsChartData = useMemo(() => {
        const calCount = (arr:Array<Stats>, count:number | null = null) => {
            const filtered = arr
                .filter(s => count === null ? true : s.count === count);

            if (filtered.length === 0) {
                return 0;
            }

            return filtered.length
        }

        const bars = [0, 1, 2, 3 , 4, 5, 6, 7, 8, 9];
        
        const bb = [
            ...bars.map(b => calCount(stats, b)),
            stats.filter(s => s.count >= 10).length,
        ];
        return bb;
    }, [stats]);

    return <>
        <div className="text-center">            
            {_t("Count of skins by played games")}
            
            <div className="text-gray-300 ml-2">
                {_t("Total skins: {0}", [stats.length])}
            </div>
        </div>
        <BarChart
            barLabel="value"
            height={200}
            series={ [{ data: statsChartData, label: _t("Skins count"), id: "skinsCount"  }] }
            width={500}
            xAxis={ [{
                data: chartXLabels.map((v, idx) => _t(`{0} {1}${ idx === chartXLabels.length - 1 ? " and more" : "" }`, [v, _t(numWords(chartXLabels[idx] || 0, ["game", "games", "game_s"]))])),
                scaleType: 'band',
            }] }
        />
        { !expanded ? <Button
            className="w-full mt-2"
            onClick={handleExpand}
            variant="text"
        >
            {_t("Show table stats")}
        </Button> : null }
        { expanded ? <>
            <StatsSearch
                onChange={setSearch}
                search={search}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell align="right">{_t("Skin")}</TableCell>
                            <TableCell>{_t("Games played")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredStats.map(stat => (
                            <StatsTableRow key={stat.name} item={stat} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>: null }
    </>;
}

type StatsSearchProps = {
    search: string | null,
    onChange: (val: string) => void,
}

const StatsSearch: FC<StatsSearchProps> = ({
    search,
    onChange,
}) => {
    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (typeof onChange === "function") {
            onChange(event?.target?.value || "");
        }
    }, [onChange]);

    const handleClear = useCallback(() => {
        if (typeof onChange === "function") {
            onChange("");
        }
    }, [onChange]);

    return <FormControl
        className="w-full"
        sx={{
            mt: 4,
        }}
        variant="outlined"
    >
        <OutlinedInput
            className="mb-2"
            id="search-stats-input"
            startAdornment={
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            }
            endAdornment={
                (search || "").length > 0 ? <InputAdornment className="cursor-pointer" onClick={handleClear} position="end">
                    <ClearIcon/>
                </InputAdornment> : null
            }
            onChange={handleInputChange}
            value={search || ""}
        />
    </FormControl>
}

type StatsTableRowProps = {
    item: Stats,
}

const StatsTableRow: FC<StatsTableRowProps> = ({
    item
}) => {
    const [open, toggleOpen] = useReducer(v => !v, false);

    return <>
        <TableRow key={item.name}>
            <TableCell>
                {typeof item?.styles?.length === "number" && item?.styles?.length > 1 ? <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={toggleOpen}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton> : null}
            </TableCell>
            <TableCell align="right">{item.name}</TableCell>
            <TableCell>{item.count}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Стиль</TableCell>
                                    <TableCell>Сыграно игр</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {item?.styles?.map(st => (
                                    <TableRow key={st.name}>
                                        <TableCell>{st.name}</TableCell>
                                        <TableCell>{st.count}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>

            </TableCell>
        </TableRow>
    </>;
}
