import React from "react";

const Button = ( props ) => {
    return <button id={props.id} className={props.class}>{props.title}</button>;
};

export default Button;
