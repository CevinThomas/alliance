import React from "react";
import PropTypes from "prop-types";

const Button = ( props ) => {
    return <button onClick={props.onclick} id={props.id} className={props.class}>{props.title}</button>;
};

Button.propTypes = {
    onClick: PropTypes.func,
    id: PropTypes.string,
    class: PropTypes.string,
    title: PropTypes.string
};

export default Button;
