import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as urlConstants from "../constants/urls";
import LOGGED_IN from "../constants/token";
import Axios from "axios";
import getToken from "../helperMethods/getToken";
import removeToken from "../helperMethods/removeToken";

const Logout = ( props ) => {

    getToken();
     
    useEffect( () => {
        Axios( {
            method: "POST",
            url: urlConstants.LOGOUT_USER_URL,
        } ).then( ( response ) => {
            removeToken( props );
            props.dispatch( { type: LOGGED_IN, payload: false } );
            props.history.push( "/login" );
        } ).catch( e => console.log( e ) );
    }, [] );

    return (
        <React.Fragment/>
    );
};

export default connect()( withRouter( Logout ) );
