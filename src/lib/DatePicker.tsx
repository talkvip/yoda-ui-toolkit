import * as React from 'react';
let InternalDatePicker = require("react-bootstrap-date-picker");

export interface DatePickerProps {
    value?: string,
    cellPadding?: string,
    placeholder?: string,
    dayLabels?: string[],
    monthLabels?: string[],
    onChange?: (value)=>void,
    onClear?: ()=>void,
    clearButtonElement?: string | JSX.Element,
    previousButtonElement?: string | JSX.Element,
    nextButtonElement?: string | JSX.Element,
    calendarPlacement?: string,
    dateFormat?: string
}

export const DatePicker = (props: DatePickerProps)  =>{
    return <InternalDatePicker  {...props}
    />
}
