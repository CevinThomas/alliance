import React, {useState} from "react";

const Select = ( props ) => {

    const [ selectedMonth, setSelectedMonth ] = useState( "January" );
    const [ currentMonthMaxDays, setCurrentMonthMaxDays ] = useState( 31 );
    console.log( selectedMonth );
    console.log( currentMonthMaxDays );

    let monthUI;
    monthUI = Object.entries( props.months ).map( ( month ) => {
        const removedNumber = month.splice( 1, 1 );
        return (
            <option key={removedNumber} value={removedNumber}>
                {removedNumber}
            </option>
        );
    } );

    let maxDays = [];
    for ( let i = 0; i < currentMonthMaxDays; i++ ) {
        maxDays.push( (i) + 1 );
    }

    let daysUI;
    daysUI = maxDays.map( ( day ) => {
        return (
            <option>
                {day}
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
            <select onChange={handleMonthChange}>
                {monthUI}
            </select>
            <select>
                {daysUI}
            </select>
        </React.Fragment>
    );
};

export default Select;
