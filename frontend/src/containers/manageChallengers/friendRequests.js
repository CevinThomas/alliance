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
                <div key={request}>
                    <h2>{request}</h2>
                    <Button onclick={() => handleAcceptOrDecline( request, true )} title={"Accept"}/>
                    <Button onclick={() => handleAcceptOrDecline( request, false )} title={"Decline"}/>
                </div>
            );
        } );
    }

    return (
        <div>
            {props.loading ? <Loader/> : null}
            <h1>Friend requests</h1>
            {UI}
        </div>
    );
};

export default connect( mapStateToProps )( FriendRequests );
