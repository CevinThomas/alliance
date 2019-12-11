import React from "react";
import Heading from "../textElements/heading";
import Paragraph from "../textElements/paragraph";

const Box = ( props ) => {
    return (
        <div className={props.class}>
            <Heading type={props.type} title={props.title}/>
            <Paragraph
                title={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis imperdiet libero, ut finibus lacus hendrerit quis. In consequat, nisl at tincidunt malesuada, tortor nisl aliquet magna, nec euismod magna velit at purus. Duis id ante suscipit, feugiat risus auctor, bibendum nulla."}/>
        </div>
    );
};

export default Box;
