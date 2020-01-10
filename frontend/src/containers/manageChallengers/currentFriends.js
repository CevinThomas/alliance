import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Axios from "axios";
import * as urlConstants from "../../constants/urls";
import * as friendsConstants from "../../constants/friends";
import Button from "../../components/general/button";

const mapStateToProps = state => {
    return { friends: state.friendsList };
};

const CurrentFriends = ( props ) => {

    //TODO: Send error message to Redux
    //TODO: This needs to run again, once we have accepted a friend
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
                <div key={friend._id}>
                    <h1>{friend.name}</h1>
                    <Link to={"/admin/friend/?id=" + friend._id}><Button title={"View"}/></Link>
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
