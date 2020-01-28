import React from "react";
import Input from "../forms/input";
import Button from "../general/button";

const UserInfo = () => {
    return (
        <div className={"user-info"}>
            <div>
                <div className={"user-image"}></div>
            </div>
            <div className={"user-text"}>
                <div className={"user-top-input"}>
                    <Input class={"user-name"} type={"text"} value={"Your name"} name={"name"}/>
                    <Input class={"user-phone"} type={"text"} value={"Your Phone"} name={"phone"}/>
                </div>
                <Input type={"text"} value={"Your email"} name={"email"}/>
                <Button title={"Save"}/>
            </div>
        </div>
    );
};

export default UserInfo;
