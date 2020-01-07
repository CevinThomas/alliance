import React from "react";
import Input from "../../components/forms/input";
import Select from "../../components/forms/select";
import Heading from "../../components/textElements/heading";
import Paragraph from "../../components/textElements/paragraph";
import AddCheckbox from "../../components/icons/addCheckbox";
import ChangeInformation from "../../components/icons/changeInformation";
import ViewInfo from "../../components/icons/viewInfo";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return { chosenTask: state.chosenTaskType };
};

const FinalFormStep = ( props ) => {

    const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    const maxDays = {
        January: { days: 31 },
        February: { days: 28 },
        March: { days: 31 },
        April: { days: 30 },
        May: { days: 31 },
        June: { days: 30 },
        July: { days: 31 },
        August: { days: 31 },
        September: { days: 30 },
        October: { days: 31 },
        November: { days: 30 },
        December: { days: 31 }
    };
    const date = new Date();
    const year = date.getFullYear();
    let years = [];

    for ( let i = year; i < year + 5; i++ ) {
        years.push( i );
    }

    let formUI;
    //TODO: Remake these into the environment variables just like in redux for easier maintenance
    //TODO: Instead of having a single Select component for months, days and years. Make one component that holds each, move state and logic to this container
    if ( props.chosenTask === "Checkbox" ) {

        formUI = (
            <div>
                <Input type={"text"} placeholder={"Name of Challenge"}/>
                <Input type={"text"} placeholder={"Description of Challenge"}/>
                <div>
                    <Select months={months} maxDays={maxDays} years={years}/>
                </div>
            </div>
        );
    } else if ( props.chosenTask === "Single" ) {

    } else if ( props.chosenTask === "Big" ) {

    } else {

    }

    return (
        <div className={"final-form"} id={"checkbox-form"}>
            <div className={"left-column"}>
                <div>
                    <Heading title={"Create your task"} type={"h2"}/>
                    <Paragraph title={"And get instant access to our Resources!"}/>
                </div>
                <div className={"circle-container"}>
                    <AddCheckbox type={"h4"} title={"Add Checkbox"}/>
                    <ChangeInformation type={"h4"} title={"Change task information"}/>
                    <ViewInfo type={"h4"} title={"View info"}/>
                </div>
            </div>
            <div className={"right-column"}>
                <div id={"first-right-container"} className={"right-container"}>
                    <Heading class={"task-form-heading"} title={"Final Form Step"} type={"h2"}/>
                    <div className={"task-form"}>
                        <h2>You have chosen {props.chosenTask}</h2>
                        {formUI}
                    </div>
                </div>
                <div className={"right-container"}>

                </div>
            </div>


        </div>
    );
};

export default connect( mapStateToProps )( FinalFormStep );
