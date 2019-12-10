import React from "react";
import PropTypes from "prop-types";

const Input = ( props ) => {
    return <input onChange={props.onchange} name={props.name} id={props.id} className={props.class} value={props.value}
                  placeholder={props.placeholder} type={props.type}/>;
};

Input.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    id: PropTypes.string,
    class: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string
};

export default Input;
