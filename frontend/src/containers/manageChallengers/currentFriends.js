import React, {useEffect} from "react";
import {connect} from "react-redux";
import Axios from "axios";
import * as urlConstants from "../../constants/urls";
import * as friendsConstants from "../../constants/friends";

const mapStateToProps = state => {
    return { friends: state.friendsList };
};

const CurrentFriends = ( props ) => {

    //TODO: Send error message to Redux
    useEffect( () => {
        Axios( {
            method: "GET",
            url: urlConstants.GET_CURRENT_FRIENDS
        } ).then( ( friends ) => {
            props.dispatch( { type: friendsConstants.CURRENT_FRIENDS, payload: friends.data } );
        } ).catch( e => console.log( e ) );
    }, [] );

    let friendsUI;

    if ( props.friends.length !== 0 ) {
        friendsUI = props.friends.map( ( friend ) => {
            return (
                <div>
                    <h1>{friend}</h1>
                </div>
            );
        } );
    }


    return (
        <div>
            {friendsUI}
        </div>
    );
};

export default connect( mapStateToProps )( CurrentFriends );
