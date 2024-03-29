import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Axios from "axios";
import * as urlConstants from "../../constants/urls";
import * as friendsConstants from "../../constants/friends";
import Button from "../../components/general/button";
import {isLoading} from "../../redux/actions";
import Loader from "../../components/loader/loader";

const mapStateToProps = state => {
    return { friends: state.friendsList, updatedFriendRequests: state.updateFriendRequest, loading: state.loading };
};


const CurrentFriends = ( props ) => {

    //TODO: Send error message to Redux
    //TODO: This needs to run again, once we have accepted a friend
    useEffect( () => {
        props.dispatch( isLoading( true ) );
        Axios( {
            method: "GET",
            url: urlConstants.GET_CURRENT_FRIENDS
        } ).then( ( friends ) => {
            props.dispatch( { type: friendsConstants.CURRENT_FRIENDS, payload: friends.data } );
            props.dispatch( isLoading( false ) );
        } ).catch( e => console.log( e ) );
    }, [ props.updatedFriendRequests ] );

    let friendsUI;

    if ( props.friends.length !== 0 ) {
        friendsUI = props.friends.map( ( friend ) => {
            return (
                <div className={"friend-container"} key={friend._id}>
                    <div className={"friend-image"}>
                        <div className={"temp-friend-image"}></div>
                    </div>
                    <div className={"friend-info"}>
                        <h3>{friend.name}</h3>
                        <p>Some random quote they have to say</p>
                        <Link to={"/admin/friend/?id=" + friend._id}><Button title={"View"}/></Link>
                    </div>
                </div>
            );
        } );
    }


    return (
        <div className={"friends-container"}>
            {props.loading ? <Loader/> : null}
            {props.friends.length !== 0 ? <h3 className={"requests-title"}>Friends List</h3> : null}
            {friendsUI}
        </div>
    );
};

export default connect( mapStateToProps )( CurrentFriends );
