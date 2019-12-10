import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import LOGGED_IN from "../../constants/token";
import AvatarIcon from "../misc/svgLogin";

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
            <Link to={"/account"}>
                <AvatarIcon id={"avatar_icon"}/>
            </Link>
        );
    } else {
        isOnlineElement = (
            <AvatarIcon id={"avatar_not_logged_in"}/>
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
