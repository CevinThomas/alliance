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
    showModal: state.showChallengerModal,
    space: state.spaceCredentials,
    friendsToInvite: state.friendsToInvite
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
            console.log( response );
            //TODO: Unit checking
            props.dispatch( { type: userConstants.USER_CREDENTIALS, payload: response.data } );
        } );
    }, [] );

    //TODO: Refactor this into a single helper method
    const sendDataToEndpoint = () => {
        Axios( {
            method: "POST",
            url: urlConstants.CREATE_SPACE_URL,
            data: {
                name: props.space.name,
                desc: props.space.desc,
                friendsToInvite: props.friendsToInvite
            }
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

    const handleCheckboxChange = ( e ) => {
        if ( e.target.checked ) {
            props.dispatch( { type: spaceConstants.SPACE_CHALLENGERS, payload: { add: e.target.value } } );
        } else {
            props.dispatch( { type: spaceConstants.SPACE_CHALLENGERS, payload: { remove: e.target.value } } );
        }

    };

    const showModalFunction = () => {
        props.dispatch( { type: generalConstants.SHOW_MODAL, payload: true } );
    };

    let ModalUI = "";
    if ( props.user.friends ) {
        if ( props.user.friends.length > 0 ) {
            ModalUI = props.user.friends.map( ( friend ) => {
                if ( props.friendsToInvite.includes( friend ) ) {
                    return (<div key={friend} className={"friend-container checked-friend"}>
                            <label htmlFor="">{friend}</label>
                            <Input onchange={handleCheckboxChange} type={"checkbox"} value={friend}/>
                        </div>
                    );
                } else {
                    return (
                        <div key={friend} className={"friend-container"}>
                            <label htmlFor="">{friend}</label>
                            <Input onchange={handleCheckboxChange} type={"checkbox"} value={friend}/>
                        </div>
                    );
                }

            } );
        }

    }


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
                </div>
                {props.showModal ?
                    <div className={"modal"}>{ModalUI} <Button onclick={sendDataToEndpoint} title={"Create"}/>
                    </div>
                    : ""}
            </div>
        </div>
    );
};

export default connect( mapStateToProps )( CreateBox );
