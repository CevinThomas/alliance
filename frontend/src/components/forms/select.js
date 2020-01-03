import React, {useEffect, useState} from "react";

const Select = ( props ) => {

    const [ selectedMonth, setSelectedMonth ] = useState( "January" );
    const [ currentMonthMaxDays, setCurrentMonthMaxDays ] = useState( 31 );
    const [ currentDay, setCurrentDay ] = useState( 1 );
    const [ currentMonth, setCurrentMonth ] = useState( 0 );

    const date = new Date();

    useEffect( () => {
        setCurrentDay( date.getDate() );
        setCurrentMonth( date.getMonth() );
    }, [] );

    let monthUI, selected;
    monthUI = Object.entries( props.months ).map( ( month ) => {
        if ( month[0] == currentMonth ) {
            selected = "selected";
        } else {
            selected = "";
        }
        const removedNumber = month.splice( 1, 1 );
        return (
            <option selected={selected} key={removedNumber} value={removedNumber}>
                {removedNumber}
            </option>
        );
    } );

    let daysToShow = [];
    for ( let i = 0; i < currentMonthMaxDays; i++ ) {
        daysToShow.push( (i) + 1 );
    }

    let daysUI, daySelected;
    daysUI = daysToShow.map( ( day ) => {
        if ( day == currentDay ) {
            daySelected = day;
        } else {
            daySelected = "";
        }
        return (
            <option selected={daySelected} key={day}>
                {day}
            </option>
        );
    } );

    let yearsUI;
    yearsUI = props.years.map( ( year ) => {
        return (
            <option key={year}>
                {year}
            </option>
        );
    } );

    const handleMonthChange = ( e ) => {
        setSelectedMonth( e.target.value );
        displayCorrectDays( e.target.value );
    };

    const displayCorrectDays = ( newMonth ) => {
        Object.entries( props.maxDays ).map( ( day ) => {
            if ( day[0] === newMonth ) {
                setCurrentMonthMaxDays( day[1].days );
            }
        } );
    };

    return (
        <React.Fragment>
            <select name={"month-selected"} onChange={handleMonthChange}>
                {monthUI}
            </select>
            <select name={"day-selected"}>
                {daysUI}
            </select>
            <select name={"year-selected"}>
                {yearsUI}
            </select>
        </React.Fragment>
    );
};

export default Select;
