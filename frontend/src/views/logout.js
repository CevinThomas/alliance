import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as urlConstants from "../constants/urls";
import LOGGED_IN from "../constants/token";
import Axios from "axios";
import getToken from "../helperMethods/getToken";
import removeToken from "../helperMethods/removeToken";

const Logout = ( props ) => {

    const token = getToken();

    if ( token !== false ) {
        Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        Axios.defaults.headers.common["Authorization"] = null;
    }


    //TODO: Refactor to a module
    Axios.defaults.headers.common = { "Authorization": `Bearer ${token}` };

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
