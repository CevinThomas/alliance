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

    //TODO: REFACTOR Into containers

    const [ madeRequest, setMadeRequest ] = useState( 0 );

    getToken();

    //TODO: Unit checking
    useEffect( () => {
        Axios( {
            method: "GET",
            url: urlConstants.GET_SPACE_INVITES
        } ).then( ( spaceInvites ) => {
            console.log( spaceInvites );
            props.dispatch( {
                type: userConstants.USER_INCOMING_SPACE_INVITES,
                payload: spaceInvites.data
            } );
        } ).catch( e => console.log( e ) );
    }, [ madeRequest ] );

    //TODO: REFACTOR into a module (We call this in friendRequests as well)
    const submitAcceptOrDeclineRequest = ( id, accept ) => {
        Axios( {
            method: "POST",
            url: "http://localhost:8000/api/accept-space",
            data: {
                accept,
                id
            }
        } ).then( ( r ) => {
            if ( r.status === 200 ) {
                setMadeRequest( madeRequest + 1 );
            }
        } );
        //TODO: Find a better way to make the component update (maybe a certain type of response from the server to determine)
    };

    const handleAcceptOrDecline = ( id, accept ) => {
        submitAcceptOrDeclineRequest( id, accept );
    };

    let spaceInvitesUI;

    spaceInvitesUI = props.spaceInvites.map( ( invite ) => {
        console.log( invite );
        return (
            <div key={invite._id}>
                <h2>{invite.name}</h2>
                <h3>{invite.description}</h3>
                <Button onclick={() => handleAcceptOrDecline( invite._id, true )} title={"Accept"}/>
                <Button onclick={() => handleAcceptOrDecline( invite._id, true )} title={"Decline"}/>
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
