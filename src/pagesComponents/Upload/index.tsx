import {DatePicker} from "@/components/DatePicker";
import SkinSelection from "@/components/SkinSelection";
import { useCurrentSkin } from "@/contexts/CurrentSkinContext";
import { Button, TextField } from "@mui/material";
import { ChangeEvent, FC, useCallback, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { saveGameMultiple } from "@/db/games";

type DateType = Dayjs | null;

export const UploadView: FC = () => {
    const [amount, setAmount] = useState<number>(1);
    const [date, setDate] = useState<DateType>(dayjs());

    const {currentSkinStyle, setCurrentSkin} = useCurrentSkin();

    const handleAmountChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setAmount(parseInt(event.currentTarget?.value));
    }, []);

    const handleSave = useCallback(() => {
        saveGameMultiple(currentSkinStyle, date?.set("hour", 12).toDate(), amount);
        setCurrentSkin(null, null);
        setAmount(1);
    }, [currentSkinStyle, date, amount, setCurrentSkin]);

    return <>
        <SkinSelection/>
        <TextField
            className="w-full"
            type="number"
            onChange={handleAmountChange}
            value={amount}
            size="small"
        />
        <DatePicker
            value={date}
            setValue={setDate}
        />
        <Button
            disabled={currentSkinStyle === null}
            variant="contained"
            onClick={handleSave}
        >
            Сохранить
        </Button>
    </>;
}

export const Upload = UploadView;
