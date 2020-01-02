import React, {useEffect} from "react";
import {connect} from "react-redux";
import Axios from "axios";
import * as urlConstants from "../../constants/urls";
import * as spaceConstants from "../../constants/space";
import getToken from "../../helperMethods/getToken";

const mapStateToProps = state => {
    return { chosenTaskType: state.chosenTaskType };
};
const ShowSpaceStep = ( props ) => {

    getToken();

    useEffect( () => {
        Axios( {
            method: "GET",
            url: urlConstants.GET_SPACES_FROM_USER
        } ).then( ( response ) => {
            props.dispatch( { type: spaceConstants.USERS_SPACES, payload: response.data } );
        } );
    } );

    return (
        <div>
            <h2>{`You chose ${props.chosenTaskType}`}</h2>
        </div>
    );
};

export default connect( mapStateToProps )( ShowSpaceStep );
