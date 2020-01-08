import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import * as taskConstants from "../../constants/tasks";
import getMonthFromString from "../../helperMethods/getMonthFromString";

const Select = ( props ) => {

    const date = new Date();

    const [ selectedMonth, setSelectedMonth ] = useState( "" );
    const [ currentMonthMaxDays, setCurrentMonthMaxDays ] = useState( 31 );
    const [ currentDay, setCurrentDay ] = useState( 1 );
    const [ currentMonth, setCurrentMonth ] = useState( 0 );
    const [ currentYear, setCurrentYear ] = useState( 0 );

    const [ chosenEndDate, setChosenEndDate ] = useState( {
        year: (date.getFullYear()).toString(),
        month: (date.getMonth() + 1).toString(),
        day: (date.getDate()).toString()
    } );

    useEffect( () => {
        setCurrentDay( date.getDate().toString() );
        setCurrentMonth( (date.getMonth()).toString() );
        setCurrentYear( date.getFullYear().toString() );

        let endDate = new Date( Date.UTC( chosenEndDate.year, chosenEndDate.month, chosenEndDate.day ) );
        const timeStamp = endDate.getTime() / 1000;

        props.dispatch( { type: taskConstants.END_DATE_CREATION, payload: timeStamp } );

    }, [ chosenEndDate ] );
    
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
        handleEndDateChange( e );
    };

    const handleEndDateChange = ( e ) => {
        if ( e.target.name === "month" ) {
            setChosenEndDate( {
                ...chosenEndDate,
                [e.target.name]: getMonthFromString( e.target.value ).toString()
            } );
        } else {
            setChosenEndDate( {
                ...chosenEndDate,
                [e.target.name]: e.target.value
            } );
        }


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
            <select name={"month"} onChange={handleMonthChange}>
                {monthUI}
            </select>
            <select onChange={handleEndDateChange} name={"day"}>
                {daysUI}
            </select>
            <select onChange={handleEndDateChange} name={"year"}>
                {yearsUI}
            </select>
        </React.Fragment>
    );
};

export default connect()( Select );
