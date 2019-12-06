import React from "react";
import Heading from "../../Components/textElements/heading";

const LeftColumn = ( props ) => {
    return (
        <div id={props.id}>
            <Heading class={"registration-heading"} type={"h2"} title={"Left Column"}/>
        </div>
    );
};

export default LeftColumn;
