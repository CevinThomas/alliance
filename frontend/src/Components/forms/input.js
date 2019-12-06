import React from "react";

const Input = ( props ) => {
    return <input name={props.name} id={props.id} className={props.class} value={props.value}
                  placeholder={props.placeholder} type={props.type}/>;
};

export default Input;
