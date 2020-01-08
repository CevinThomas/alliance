import React from "react";
import Heading from "../textElements/heading";

const CircularClickableIcon = ( props ) => {
    return (
        <React.Fragment>
            <div className={"circle-icon"}>
                <div className={"circle-heading-container"}>
                    <Heading type={props.type} title={props.title}/>
                </div>
            </div>

        </React.Fragment>
    );
};

export default CircularClickableIcon;
