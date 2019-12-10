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
            <Heading title={"Login"}/>
            <Input/>
            <Input/>
            <Input/>
            <Button/>
        </div>
    );
};

export default LoginBox;
