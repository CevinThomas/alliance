import React from "react";
import TopBar from "../../components/nav/topBar";
import Heading from "../../components/textElements/heading";
import Input from "../../components/forms/input";
import Button from "../../components/general/button";

const CreateBox = () => {

    const topBarObject = {
        linkOne: {
            to: "/admin",
            title: "Go Back"
        },
        linkTwo: {
            to: "/randomUrl",
            title: "Go Here"
        }
    };

    return (
        <div className={"create-space-box"}>
            <TopBar links={topBarObject}/>
            <div className={"create-space-box-container"}>
                <Heading title={"Create your space"} type={"h2"}/>
                <div className={"form-container"}>
                    <Input type={"text"} name={"name"} id={"name"} placeholder={"Enter Name"}/>
                    <Input type={"text"} name={"desc"} id={"desc"} placeholder={"Enter Description"}/>
                    <Input type={"text"} name={"challengers"} id={"challengers"} placeholder={"Enter Challengers"}/>
                    <Button title={"Create"}/>
                </div>
            </div>
        </div>
    );
};

export default CreateBox;
