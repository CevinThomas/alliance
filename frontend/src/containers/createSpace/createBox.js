import React, {useEffect} from "react";
import {connect} from "react-redux";
import TopBar from "../../components/nav/topBar";
import Heading from "../../components/textElements/heading";
import Input from "../../components/forms/input";
import Button from "../../components/general/button";
import Axios from "axios";
import * as urlConstants from "../../constants/urls";
import * as spaceConstants from "../../constants/space";
import *as generalConstants from "../../constants/general";
import * as friendConstants from "../../constants/friends";
import * as taskConstants from "../../constants/tasks";
import getToken from "../../helperMethods/getToken";
import ThankYouModal from "../../components/modals/thankYouModal";
import {isLoading} from "../../redux/actions";
import Loader from "../../components/loader/loader";

const mapStateToProps = state => ({
    user: state.MainUserCredentials,
    friendsList: state.friendsList,
    showModal: state.showChallengerModal,
    space: state.spaceCredentials,
    friendsToInvite: state.friendsToInvite,
    showThankYouModal: state.showThankYouModal,
    loading: state.isLoading
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
        props.dispatch( isLoading( true ) );
        Axios( {
            method: "GET",
            url: urlConstants.GET_CURRENT_FRIENDS
        } ).then( ( response ) => {
            console.log( response );
            //TODO: Unit checking
            props.dispatch( { type: friendConstants.CURRENT_FRIENDS, payload: response.data } );
            props.dispatch( isLoading( false ) );
        } );
    }, [] );

    //TODO: Refactor this into a single helper method
    const sendDataToEndpoint = () => {
        props.dispatch( isLoading( true ) );
        Axios( {
            method: "POST",
            url: urlConstants.CREATE_SPACE_URL,
            data: {
                name: props.space.name,
                desc: props.space.desc,
                friendsToInvite: props.friendsToInvite
            }
        } ).then( ( r ) => {
            props.dispatch( { type: taskConstants.SHOW_THANK_YOU_MODAL, payload: true } );
            props.dispatch( isLoading( false ) );
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
    if ( props.friendsList ) {
        if ( props.friendsList.length > 0 ) {
            ModalUI = props.friendsList.map( ( friend ) => {
                if ( props.friendsToInvite.includes( friend.email ) ) {
                    return (<div key={friend._id} className={"friend-container checked-friend"}>
                            <label htmlFor="">{friend.name} Selected</label>
                            <Input onchange={handleCheckboxChange} type={"checkbox"} value={friend.email}/>
                        </div>
                    );
                } else {
                    return (
                        <div key={friend._id} className={"friend-container"}>
                            <label htmlFor="">{friend.name}</label>
                            <Input onchange={handleCheckboxChange} type={"checkbox"} value={friend.email}/>
                        </div>
                    );
                }

            } );
        }
    }

    if ( props.showThankYouModal === true ) return <ThankYouModal title={"Thank you for creating this space!"}/>;


    return (
        <div className={"create-space-box"}>
            {props.loading ? <Loader/> : null}
            <TopBar links={topBarObject}/>
            <div className={"create-space-box-container"}>
                <Heading title={"Create your space"} type={"h2"}/>
                <div className={"space-creation-container"}>
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
        </div>
    );
};

export default connect( mapStateToProps )( CreateBox );
