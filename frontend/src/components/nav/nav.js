import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import LOGGED_IN from "../../constants/token";

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
        </div>
    );
};

export default connect( mapStateToProps )( Navbar );
