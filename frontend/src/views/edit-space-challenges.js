import React, {useEffect, useState} from "react";
import Axios from "axios";
import * as urlConstants from "../constants/urls";
import * as userConstants from "../constants/user";
import getToken from "../helperMethods/getToken";
import {connect} from "react-redux";
import Button from "../components/general/button";

const mapStateToProps = state => {
    return { spaceInvites: state.incomingSpaceInvites };
};

const EditSpaceChallenges = ( props ) => {

    const [ madeRequest, setMadeRequest ] = useState( 0 );

    getToken();

    //TODO: Unit checking
    useEffect( () => {
        Axios( {
            method: "GET",
            url: urlConstants.GET_ME
        } ).then( ( me ) => {
            props.dispatch( {
                type: userConstants.USER_INCOMING_SPACE_INVITES,
                payload: me.data.incomingSpaceInvites
            } );
        } ).catch( e => console.log( e ) );
    }, [] );

    //TODO: REFACTOR into a module (We call this in friendRequests as well)
    const submitAcceptOrDeclineRequest = ( name, accept ) => {
        Axios( {
            method: "POST",
            url: "http://localhost:8000/api/accept-space",
            data: {
                accept,
                name
            }
        } );
        //TODO: Find a better way to make the component update (maybe a certain type of response from the server to determine)
        setTimeout( () => {
            setMadeRequest( madeRequest + 1 );
        }, 500 );
    };

    const handleAcceptOrDecline = ( name, accept ) => {
        submitAcceptOrDeclineRequest( name, accept );
    };

    let spaceInvitesUI;

    spaceInvitesUI = props.spaceInvites.map( ( invite ) => {
        return (
            <div key={invite}>
                <h2>{invite}</h2>
                <Button onclick={() => handleAcceptOrDecline( invite, true )} title={"Accept"}/>
                <Button onclick={() => handleAcceptOrDecline( invite, true )} title={"Decline"}/>
            </div>
        );
    } );

    return (
        <div>
            <h1>Space Invites</h1>
            {spaceInvitesUI}
        </div>
    );
};

export default connect( mapStateToProps )( EditSpaceChallenges );
