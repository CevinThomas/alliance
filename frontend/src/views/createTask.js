import React from "react";
import ChooseChallenge from "../containers/createChallenge";
import {connect} from "react-redux";
import ShowSpaceStep from "../containers/createSpace/showSpaceStep";

const mapStateToProps = state => {
    return { chosenTaskType: state.chosenTaskType };
};

const CreateChallenge = ( props ) => {

    let stepsUI;
    if ( props.chosenTaskType !== "" ) {
        stepsUI = <ShowSpaceStep/>;
    } else {
        stepsUI = <ChooseChallenge/>;
    }

    return (
        <div>
            {stepsUI}
        </div>
    );
};

export default connect( mapStateToProps )( CreateChallenge );
