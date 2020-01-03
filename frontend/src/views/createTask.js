import React from "react";
import ChooseChallenge from "../containers/createChallenge";
import {connect} from "react-redux";
import ShowSpaceStep from "../containers/createChallenge/showSpaceStep";
import FinalFormStep from "../containers/createChallenge/finalFormStep";

const mapStateToProps = state => {
    return { chosenTaskType: state.chosenTaskType, chosenSpace: state.chosenSpace };
};

const CreateChallenge = ( props ) => {

    let stepsUI;

    if ( props.chosenSpace !== "" && props.chosenTaskType !== "" ) {
        stepsUI = <FinalFormStep/>;
    } else if ( props.chosenTaskType !== "" ) {
        stepsUI = <ShowSpaceStep/>;
    } else {
        stepsUI = <ChooseChallenge/>;
    }

    return (
        <div id={"create-task"}>
            {stepsUI}
        </div>
    );
};

export default connect( mapStateToProps )( CreateChallenge );
