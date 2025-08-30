import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as DatePickerComp } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

type DateType = Dayjs | null;

type DatePickerProps = {
    value: DateType,
    setValue: (newValue: DateType) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
    value,
    setValue,
}) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePickerComp
          value={value}
          onChange={setValue}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
