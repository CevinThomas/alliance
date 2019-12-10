import React from "react";
import AvatarIcon from "../../components/misc/svgLogin";
import Heading from "../../components/textElements/heading";
import Input from "../../components/forms/input";
import Button from "../../components/general/button";
import Overlay from "../../components/general/overlay";
import NotMember from "../../components/misc/notMember";
import ErrorMessage from "../../components/misc/errorMessage";

const LoginBox = ( props ) => {
    return (
        <div id={props.id}>
            <Overlay/>
            <AvatarIcon/>
            <Heading class={"login-header"} title={"Login"}/>
            <ErrorMessage class={"error-div"} errorMessage={"Error test"}/>
            <div className={"form"} id={"loginForm"}>
                <div id={"form-inner"}>
                    <Input placeholder={"Email"} type={"email"} name={"email"}/>
                    <Input placeholder={"Password"} type={"password"} name={"password"}/>
                    <Button title={"Login"}/>
                    <NotMember link={"/registration"} message={"Not a member?"} id={"not-login"}/>
                </div>
            </div>
        </div>
    );
};

export default LoginBox;
