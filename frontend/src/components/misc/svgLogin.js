import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";

const AvatarIcon = ( props ) => {
    return (
        <FontAwesomeIcon id={props.id} icon={faUserCircle}/>
    );
};

export default AvatarIcon;