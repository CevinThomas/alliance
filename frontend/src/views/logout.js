import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import * as urlConstants from "../constants/urls";
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
            console.log( response );
            removeToken( props );
            props.history.push( "/login" );
        } ).catch( e => console.log( e ) );
    }, [] );

    return (
        <React.Fragment/>
    );
};

export default withRouter( Logout );
