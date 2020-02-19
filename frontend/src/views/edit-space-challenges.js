import React, {useEffect, useState} from "react";
import Axios from "axios";
import * as urlConstants from "../constants/urls";
import * as userConstants from "../constants/user";
import getToken from "../helperMethods/getToken";
import {connect} from "react-redux";
import Button from "../components/general/button";
import CurrentSpaces from "../containers/editSpace/currentSpaces";
import Navbar from "../components/nav/nav";
import checkLoggedIn from "../HOC/checkLoggedIn";
import {isLoading} from "../redux/actions";
import Loader from "../components/loader/loader";


const mapStateToProps = state => {
    return { spaceInvites: state.incomingSpaceInvites, loading: state.isLoading };
};

const EditSpaceChallenges = ( props ) => {

    //TODO: REFACTOR Into containers

    const [ madeRequest, setMadeRequest ] = useState( 0 );

    getToken();

    //TODO: Unit checking
    useEffect( () => {
        props.dispatch( isLoading( true ) );
        Axios( {
            method: "GET",
            url: urlConstants.GET_SPACE_INVITES
        } ).then( ( spaceInvites ) => {
            console.log( spaceInvites );
            props.dispatch( {
                type: userConstants.USER_INCOMING_SPACE_INVITES,
                payload: spaceInvites.data
            } );
            props.dispatch( isLoading( false ) );
        } ).catch( e => console.log( e ) );
    }, [ madeRequest ] );

    //TODO: REFACTOR into a module (We call this in friendRequests as well)
    const submitAcceptOrDeclineRequest = ( id, accept ) => {
        props.dispatch( isLoading( true ) );
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
            props.dispatch( isLoading( false ) );
        } );
    };

    //TODO: WTF Is this doing here?
    const handleAcceptOrDecline = ( id, accept ) => {
        submitAcceptOrDeclineRequest( id, accept );
    };

    let spaceInvitesUI;
    spaceInvitesUI = props.spaceInvites.map( ( invite ) => {
        return (
            <div className={"incoming-space"} key={invite._id}>
                <div className={"incoming-space-heading"}>
                    <h3>Name: {invite.name}</h3>
                    <h4>Description: {invite.description}</h4>
                </div>
                <div className={"incoming-space-buttons"}>
                    <Button onclick={() => handleAcceptOrDecline( invite._id, true )} title={"Accept"}/>
                    <Button onclick={() => handleAcceptOrDecline( invite._id, false )} title={"Decline"}/>
                </div>
            </div>
        );
    } );

    return (
        <React.Fragment>
            <Navbar dark/>
            <section id={"edit-spaces"}>
                {props.loading ? <Loader/> : null}
                <div className={"full-width-container space-invites-container"}>
                    {props.spaceInvites.length === 0 ? <h2>You currently have no Space Invites</h2> :
                        <h2>Incoming Space Invites:</h2>}
                    {spaceInvitesUI}
                </div>
                <div className={"current-spaces-container main-container"}>
                    <CurrentSpaces/>
                </div>
            </section>
        </React.Fragment>
    );
};

export default connect( mapStateToProps )( checkLoggedIn( EditSpaceChallenges ) );
