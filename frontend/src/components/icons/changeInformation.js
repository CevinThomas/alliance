import React from "react";
import Heading from "../textElements/heading";
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ChangeInformation = ( props ) => {
    return (
        <React.Fragment>
            <div onClick={props.onclick} id={"change"} className={"circle-icon"}>
                <FontAwesomeIcon id={props.id} icon={faQuestionCircle}/>
                <div className={"circle-heading-container"}>
                    <Heading type={props.type} title={props.title}/>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ChangeInformation;
