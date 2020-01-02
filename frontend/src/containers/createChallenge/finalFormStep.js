import React from "react";
import {connect} from "react-redux";
import Input from "../../components/forms/input";
import Select from "../../components/forms/select";

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

    let formUI;
    //TODO: Remake these into the environment variables just like in redux for easier maintenance
    if ( props.chosenTask === "Checkbox" ) {
        formUI = (
            <div>
                <Input type={"text"} placeholder={"Name of Challenge"}/>
                <Input type={"text"} placeholder={"Description of Challenge"}/>
                <div>
                    <Select months={months} maxDays={maxDays}/>
                </div>
            </div>
        );
    } else if ( props.chosenTask === "Single" ) {

    } else if ( props.chosenTask === "Big" ) {

    } else {

    }

    return (
        <div>
            <h2>Final form step</h2>
            <div>
                <h2>You have chosen {props.chosenTask}</h2>
                {formUI}
            </div>
        </div>
    );
};

export default connect( mapStateToProps )( FinalFormStep );
