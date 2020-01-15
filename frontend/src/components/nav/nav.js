import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import AvatarIcon from "../misc/svgLogin";

const mapStateToProps = state => {
    return { isOnline: state.userIsOnline };
};

const Navbar = ( props ) => {
    
    //TODO: This flickers, will need to be changed the way we check the state. We always get false first render
    let isOnlineElement;
    if ( props.isOnline === true ) {
        isOnlineElement = (
            <li className={"link-item"}>
                <Link to={"/account"}>
                    <AvatarIcon id={"avatar_icon"}/>
                </Link>
            </li>
        );
    } else {
        isOnlineElement = "";
    }

    let darkClass;
    props.dark ? darkClass = " navbar-dark" : darkClass = "";


    return (
        <div className={"navbar" + darkClass}>
            <li className={"link-item"}>
                <Link to={"/"}>Home</Link>
            </li>
            <li className={"link-item"}>
                <Link to={"/login"}>Login</Link>
            </li>
            <li className={"link-item"}>
                <Link to={"/registration"}>Registration</Link>
            </li>
            <li className={"link-item"}>
                <Link to={"/logout"}>Logout</Link>
            </li>

            {isOnlineElement}

        </div>
    );
};

export default connect( mapStateToProps )( Navbar );
