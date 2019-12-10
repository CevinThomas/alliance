import React from "react";
import Heading from "../../components/textElements/heading";
import Button from "../../components/general/button";
import {withRouter} from "react-router-dom";


const LeftColumn = ( props ) => {

    const handleLoginClick = () => {
        props.history.push( "/login" );
    };

    return (
        <div data-test={"component-leftcolumn"} id={props.id}>
            <div id={"left-box-inner"}>
                <Heading data-test={"component-heading"} class={"registration-heading"} type={"h2"}
                         title={"Welcome Back!"}/>
                <Heading class={"registration-heading"} type={"h3"}
                         title={"Have you already created an account? Please go to our login page to continue"}/>
                <Button onclick={handleLoginClick} class={"login-button"} title={"Login"}/>
            </div>
        </div>
    );
};

export default withRouter( LeftColumn );
