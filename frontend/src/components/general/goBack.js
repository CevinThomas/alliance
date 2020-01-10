import React from "react";
import Button from "./button";
import {withRouter} from "react-router-dom";

const GoBack = ( props ) => {
    
    const goBackButtonClickHandler = () => {
        props.history.goBack();
    };

    return <Button onclick={goBackButtonClickHandler} id={props.id} title={props.title}/>;
};

export default withRouter( GoBack );
