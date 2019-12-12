import React from "react";
import Heading from "../textElements/heading";
import Paragraph from "../textElements/paragraph";

const Box = ( props ) => {
    return (
        <div className={props.class}>
            <Heading type={props.type} title={props.title}/>
            <Paragraph
                title={props.message}/>
        </div>
    );
};

export default Box;
