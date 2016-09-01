import * as React from 'react';
import * as moment from 'moment';

let InternalDatePicker = require("react-bootstrap-date-picker");
export interface DatePickerProps {
    /**
     * ISO date string representing the current value.
     */
    value?: string,
    /**
     * CSS padding value for calendar date cells.
     */
    cellPadding?: string,
    /**
     * placeholder text
     */
    placeholder?: string,
    /**
     * Array of day names to use in the calendar. Starting on Sunday.
     * Example: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
     */
    dayLabels?: string[],
    /**
     * Array of month names to use in the calendar.
     * Example: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
     */
    monthLabels?: string[],
    /**
     * Focus callback function.
     * Callback arguments: 
     * - value - ISO date string representing the selected value.
     */
    onChange?: (value)=>void,
    /**
     * Defines what happens when clear button is clicked.
     */
    onClear?: ()=>void,
    /**
     * Character or component to use for the clear button.
     * Example: "×"
     */
    clearButtonElement?: string | JSX.Element,
    /**
     * Character or component to use for the calendar's previous button.
     * Example: "<"
     */
    previousButtonElement?: string | JSX.Element,
    /**
     * Character or component to use for the calendar's next button.
     * Example: ">"
     */
    nextButtonElement?: string | JSX.Element,
    /**
     * Overlay placement for the popover calendar.
     * Example: "top"
     */
    calendarPlacement?: string,
    /**
     * Date format. Any combination of DD, MM, YYYY and separator.
     * Examples: "MM/DD/YYYY", "YYYY/MM/DD", "MM-DD-YYYY", or "DD MM YYYY"
     */
    dateFormat?: string
}

export const DatePicker = (props: DatePickerProps)  =>{

    return <InternalDatePicker  {...props} value={props.value && moment(props.value).toISOString()}
    />
}


