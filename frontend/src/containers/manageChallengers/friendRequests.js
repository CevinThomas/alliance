import React, {useEffect} from "react";
import {connect} from "react-redux";
import Axios from "axios";
import getToken from "../../helperMethods/getToken";
import Button from "../../components/general/button";
import * as friendConstants from "../../constants/friends";
import {UPDATE_FRIEND_REQUEST} from "../../constants/friends";
import {isLoading} from "../../redux/actions";
import Loader from "../../components/loader/loader";

const mapStateToProps = state => {
    return {
        friendRequests: state.friendRequests,
        updateFriendRequest: state.updateFriendRequest,
        loading: state.isLoading
    };
};

const FriendRequests = ( props ) => {

    getToken();

    //TODO: Change url to constant
    useEffect( () => {
        props.dispatch( isLoading( true ) );
        Axios( {
            method: "GET",
            url: "http://localhost:8000/api/get-friends-invites",
        } ).then( ( r ) => {
            props.dispatch( {
                type: friendConstants.FRIEND_REQUESTS,
                payload: r.data
            } );
            props.dispatch( isLoading( false ) );
        } ).catch( e => console.log( e ) );
    }, [ props.updateFriendRequest ] );

    //TODO: Change url to constant
    const submitAcceptOrDeclineRequest = ( email, accept ) => {
        props.dispatch( isLoading( true ) );
        Axios( {
            method: "POST",
            url: "http://localhost:8000/api/accept-friend",
            data: {
                accept,
                email
            }
        } ).then( ( response ) => {
            props.dispatch( { type: UPDATE_FRIEND_REQUEST } );
            props.dispatch( isLoading( false ) );
        } ).catch( e => console.log( e ) );
    };

    const handleAcceptOrDecline = ( email, accept ) => {
        submitAcceptOrDeclineRequest( email, accept );
    };
    
    let UI;
    if ( props.friendRequests.length !== 0 ) {
        UI = props.friendRequests.map( ( request ) => {
            return (
                <div className={"friend-request-inner"} key={request}>
                    <h3>{request}</h3>
                    <div className={"friend-request-buttons"}>
                        <Button onclick={() => handleAcceptOrDecline( request, true )} title={"Accept"}/>
                        <Button onclick={() => handleAcceptOrDecline( request, false )} title={"Decline"}/>
                    </div>
                </div>
            );
        } );
    }

    return (
        <div className={"friend-requests-container"}>
            {props.loading ? <Loader/> : null}
            {props.friendRequests.length !== 0 ? <h3 className={"requests-title"}>Friend Requests</h3> :
                <h3 className={"requests-title"}>You currently have no friend requests</h3>}
            {UI}
        </div>
    );
};

export default connect( mapStateToProps )( FriendRequests );
