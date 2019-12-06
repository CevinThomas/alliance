import React from "react";
import Heading from "../../Components/textElements/heading";
import Button from "../../Components/general/button";

const LeftColumn = ( props ) => {
    return (
        <div id={props.id}>
            <div id={"left-box-inner"}>
                <Heading class={"registration-heading"} type={"h2"} title={"Welcome Back!"}/>
                <Heading class={"registration-heading"} type={"h3"}
                         title={"Have you already created an account? Please go to our login page to continue"}/>
                <Button class={"login-button"} title={"Login"}/>
            </div>
        </div>
    );
};

export default LeftColumn;
