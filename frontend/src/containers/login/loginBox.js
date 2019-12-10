import React from "react";
import AvatarIcon from "../../components/misc/svgLogin";
import Heading from "../../components/textElements/heading";
import Input from "../../components/forms/input";
import Button from "../../components/general/button";
import Overlay from "../../components/general/overlay";

const LoginBox = ( props ) => {
    return (
        <div id={props.id}>
            <Overlay/>
            <AvatarIcon/>
            <Heading class={"login-header"} title={"Login"}/>
            <div className={"form"} id={"loginForm"}>
                <div id={"form-inner"}>
                    <Input placeholder={"Email"} type={"email"} name={"email"}/>
                    <Input placeholder={"Password"} type={"password"} name={"password"}/>
                    <Button title={"Login"}/>
                </div>
            </div>
        </div>
    );
};

export default LoginBox;
