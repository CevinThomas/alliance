import React, {useEffect, useState} from "react";
import Axios from "axios";
import * as urlConstants from "../constants/urls";
import * as userConstants from "../constants/user";
import getToken from "../helperMethods/getToken";
import {connect} from "react-redux";
import Button from "../components/general/button";
import CurrentSpaces from "../containers/editSpace/currentSpaces";
import Navbar from "../components/nav/nav";

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
    };

    //TODO: WTF Is this doing here?
    const handleAcceptOrDecline = ( id, accept ) => {
        submitAcceptOrDeclineRequest( id, accept );
    };

    let spaceInvitesUI;
    spaceInvitesUI = props.spaceInvites.map( ( invite ) => {
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
        <React.Fragment>
            <Navbar dark/>
            <div>
                <h1>Space Invites</h1>
                {spaceInvitesUI}
                <CurrentSpaces/>
            </div>
        </React.Fragment>
    );
};

export default connect( mapStateToProps )( EditSpaceChallenges );
