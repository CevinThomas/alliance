import React from "react";
import Heading from "../textElements/heading";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ChangeInformation = ( props ) => {
    return (
        <React.Fragment>
            <div className={"circle-icon"}>
                <FontAwesomeIcon id={props.id} icon={faUserCircle}/>
                <div className={"circle-heading-container"}>
                    <Heading type={props.type} title={props.title}/>
                </div>
            </div>

        </React.Fragment>
    );
};

export default ChangeInformation;
