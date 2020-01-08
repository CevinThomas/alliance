import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import Axios from "axios";
import getToken from "../../helperMethods/getToken";
import Button from "../../components/general/button";
import * as friendConstants from "../../constants/friends";

const mapStateToProps = state => {
    return { friendRequests: state.friendRequests };
};

const FriendRequests = ( props ) => {

    const [ madeRequest, setMadeRequest ] = useState( 0 );

    getToken();

    //TODO: Change url to constant
    useEffect( () => {
        console.log( "Making friends request" );
        Axios( {
            method: "GET",
            url: "http://localhost:8000/api/get-friends-invites",
        } ).then( ( r ) => {
            console.log( r.data );
            props.dispatch( {
                type: friendConstants.FRIEND_REQUESTS,
                payload: r.data
            } );
        } ).catch( e => console.log( e ) );
    }, [ madeRequest ] );

    //TODO: Change url to constant
    const submitAcceptOrDeclineRequest = ( email, accept ) => {
        Axios( {
            method: "POST",
            url: "http://localhost:8000/api/accept-friend",
            data: {
                accept,
                email
            }
        } ).then( r => setMadeRequest( madeRequest + 1 ) );
        //TODO: Find a better way to make the component update (maybe a certain type of response from the server to determine)
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
            <h1>Friend requests</h1>
            {UI}
        </div>
    );
};

export default connect( mapStateToProps )( FriendRequests );
