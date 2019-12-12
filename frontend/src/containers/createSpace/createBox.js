import React from "react";
import {connect} from "react-redux";
import TopBar from "../../components/nav/topBar";
import Heading from "../../components/textElements/heading";
import Input from "../../components/forms/input";
import Button from "../../components/general/button";
import Axios from "axios";
import * as urlConstants from "../../constants/urls";
import * as spaceConstants from "../../constants/space";

const CreateBox = ( props ) => {

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

    //TODO: Refactor this into a single helper method
    const sendDataToEndpoint = () => {
        Axios( {
            method: "POST",
            url: urlConstants.CREATE_SPACE_URL
        } );
        console.log( "hello" );
    };

    //TODO: Refactor this into a single helper method
    const handleInputChange = ( e ) => {
        if ( e.target.name === "name" ) {
            props.dispatch( { type: spaceConstants.SPACE_NAME, payload: e.target.value } );
        }
        if ( e.target.name === "desc" ) {
            props.dispatch( { type: spaceConstants.SPACE_DESC, payload: e.target.value } );
        }
    };

    return (
        <div className={"create-space-box"}>
            <TopBar links={topBarObject}/>
            <div className={"create-space-box-container"}>
                <Heading title={"Create your space"} type={"h2"}/>
                <div className={"form-container"}>
                    <Input onchange={handleInputChange} type={"text"} name={"name"} id={"name"}
                           placeholder={"Enter Name"}/>
                    <Input onchange={handleInputChange} type={"text"} name={"desc"} id={"desc"}
                           placeholder={"Enter Description"}/>
                    <Button id={"challengers-button"} title={"Add Challengers"}/>
                    <Button onclick={sendDataToEndpoint} title={"Create"}/>
                </div>
            </div>
        </div>
    );
};

export default connect()( CreateBox );
