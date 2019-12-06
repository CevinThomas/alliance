import React from "react";
import Heading from "../../Components/textElements/heading";

const RightColumn = ( props ) => {
    return (
        <div id={props.id}>
            <Heading class={"registration-heading"} title={"Right Column"}/>
        </div>
    );
};

export default RightColumn;
