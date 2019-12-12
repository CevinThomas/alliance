import React, {useEffect} from "react";
import {connect} from "react-redux";
import TopBar from "../../components/nav/topBar";
import Heading from "../../components/textElements/heading";
import Input from "../../components/forms/input";
import Button from "../../components/general/button";
import Axios from "axios";
import * as urlConstants from "../../constants/urls";
import * as spaceConstants from "../../constants/space";
import * as userConstants from "../../constants/user";
import *as generalConstants from "../../constants/general";
import getToken from "../../helperMethods/getToken";

const mapStateToProps = state => ({
    user: state.MainUserCredentials,
    showModal: state.showChallengerModal
});

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

    getToken();

    useEffect( () => {
        Axios( {
            method: "GET",
            url: urlConstants.GET_ME
        } ).then( ( response ) => {
            props.dispatch( { type: userConstants.USER_CREDENTIALS, payload: response.data } );
            console.log( response.data );
        } );
    }, [] );

    //TODO: Refactor this into a single helper method
    const sendDataToEndpoint = () => {
        Axios( {
            method: "POST",
            url: urlConstants.CREATE_SPACE_URL
        } );
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

    const showModalFunction = () => {
        props.dispatch( { type: generalConstants.SHOW_MODAL, payload: true } );
    };

    let ModalUI;
    props.user.friends.map( ( friend ) => {
        ModalUI = (
            <div className={"friend-container"}>
                <label htmlFor="">{friend}</label>
                <Input type={"checkbox"} value={friend}/>
            </div>
        );
    } );


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
                    <Button onclick={showModalFunction} id={"challengers-button"} title={"Add Challengers"}/>
                    <Button onclick={sendDataToEndpoint} title={"Create"}/>
                </div>
                {props.showModal ? <div className={"modal"}>{ModalUI}</div> : ""}
            </div>
        </div>
    );
};

export default connect( mapStateToProps )( CreateBox );
