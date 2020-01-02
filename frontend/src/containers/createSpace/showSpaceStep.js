import React, {useEffect} from "react";
import {connect} from "react-redux";
import Axios from "axios";

const mapStateToProps = state => {
    return { chosenTaskType: state.chosenTaskType };
};
const ShowSpaceStep = ( props ) => {

    useEffect( () => {
        Axios( {
            method: "GET",
            url: ""
        } );
    } );

    return (
        <div>
            <h2>{`You chose ${props.chosenTaskType}`}</h2>
        </div>
    );
};

export default connect( mapStateToProps )( ShowSpaceStep );
