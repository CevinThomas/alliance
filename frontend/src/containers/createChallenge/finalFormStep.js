import React from "react";
import {connect} from "react-redux";
import Input from "../../components/forms/input";

const mapStateToProps = state => {
    return { chosenTask: state.chosenTaskType };
};

const FinalFormStep = ( props ) => {

    let formUI;
    //TODO: Remake these into the environment variables just like in redux for easier maintenance
    if ( props.chosenTask === "Checkbox" ) {
        formUI = (
            <div>
                <Input placeholder={"Name of Challenge"}/>
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
