import React from "react";
import Heading from "../../Components/textElements/heading";
import Input from "../../Components/forms/input";
import Button from "../../Components/general/button";

const RightColumn = ( props ) => {
    //TODO: Maybe remake this with a HOC so that the container div is not JSX inside of this container
    return (
        <div id={props.id}>
            <div id={"registration-inner"}>
                <div>
                    <Heading class={"registration-heading"} title={"Create Account"}/>
                    <Heading class={"registration-heading"} title={"We need some things from you"}/>
                </div>
                <div id={"registration-box"}>
                    <Input type={"text"} placeholder={"Enter your name"} name={"name"}/>
                    <Input type={"email"} placeholder={"Enter your email"} name={"email"}/>
                    <Input type={"password"} placeholder={"Enter your password"} name={"password"}/>
                    <Button title={"Sign up"}/>
                </div>
            </div>
        </div>
    );
};

export default RightColumn;
