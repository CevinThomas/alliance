import React, {useEffect} from "react";
import GoToSpaces from "../containers/homePage/goToSpaces";
import Navbar from "../components/nav/nav";
import LOGGED_IN from "../constants/token";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        isLoggedIn: state.userIsOnline
    };
};

const HomePage = ( props ) => {

    useEffect( () => {
        if ( localStorage.getItem( "TOKEN" ) ) {
            if ( props.isLoggedIn !== true ) {
                props.dispatch( { type: LOGGED_IN, payload: true } );
            }
        }
    }, [] );

    return (
        <React.Fragment>
            <Navbar dark/>
            <div>
                <GoToSpaces/>
            </div>
        </React.Fragment>
    );
};

export default connect( mapStateToProps, null )( HomePage );
