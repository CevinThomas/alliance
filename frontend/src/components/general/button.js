import React from "react";

const Button = ( props ) => {
    return <button onClick={props.onclick} id={props.id} className={props.class}>{props.title}</button>;
};

export default Button;
