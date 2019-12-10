import React from "react";

const Paragraph = ( props ) => {
    return <p id={props.id} className={props.class}>{props.title}</p>;
};

export default Paragraph;
