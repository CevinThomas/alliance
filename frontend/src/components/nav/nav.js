import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import LOGGED_IN from "../../constants/token";
import Heading from "../textElements/heading";

const mapStateToProps = state => {
    return { isOnline: state.userIsOnline };
};

const Navbar = ( props ) => {

    useEffect( () => {
        if ( localStorage.getItem( "TOKEN" ) ) {
            props.dispatch( { type: LOGGED_IN, payload: true } );
        } else {
            props.dispatch( { type: LOGGED_IN, payload: false } );
        }
    }, [] );


    //TODO: This flickers, will need to be changed the way we check the state. We always get false first render
    let isOnlineElement;
    if ( props.isOnline === true ) {
        isOnlineElement = (
            <Heading title={"WE ARE LOGGED IN"}/>
        );
    } else {
        isOnlineElement = (
            <Heading title={"WE ARE NOT LOGGED IN"}/>
        );
    }


    return (
        <div className={"navbar"}>
            <li className={"link-item"}>
                <Link to={"/login"}>Login</Link>
            </li>
            <li className={"link-item"}>
                <Link to={"/registration"}>Registration</Link>
            </li>
            <li className={"link-item"}>
                <Link to={"/logout"}>Logout</Link>
            </li>
            <li className={"link-item"}>
                {isOnlineElement}
            </li>
        </div>
    );
};

export default connect( mapStateToProps )( Navbar );
