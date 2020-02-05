import React, {useRef, useState} from "react";
import {connect} from "react-redux";
import Axios from "axios";
import {isLoading} from "../../redux/actions";
import Loader from "../../components/loader/loader";

const mapStateToProps = state => {
    return { friend: state.addFriend, loading: state.isLoading, searchFriends: state.friendSearchResults };
};

const AddFriends = ( props ) => {

    const refSearchButton = useRef( null );
    const refAddFriend = useRef( null );
    const [ friendsSearchResponse, setFriendsSearchResponse ] = useState( "" );
    const [ addedFriends, setAddedFriends ] = useState( [] );
    const [ userId, setUserId ] = useState( "" );
    const [ user, setUser ] = useState( "" );

    //TODO: Change URL to constant
    const addFriendRequest = ( friend ) => {
        props.dispatch( isLoading( true ) );
        Axios( {
            method: "POST",
            url: "http://localhost:8000/api/add-friends",
            data: {
                friend: friend
            }
        } ).then( ( r ) => {
            props.dispatch( isLoading( false ) );
        } );
    };

    const searchForFriends = () => {
        Axios( {
            method: "POST",
            url: "http://localhost:8000/api/search-for-friends",
            data: {
                search: refSearchButton.current.value
            }
        } ).then( ( r ) => {
            console.log( r );
            if ( r.data.success === false ) return setFriendsSearchResponse( r.data );
            setFriendsSearchResponse( r.data.users );
            setUser( r.data.user );
        } ).catch( e => console.log( e ) );
    };

    const addFriendsToState = ( friend ) => {
        let newlyAddedFriend = [];
        newlyAddedFriend.push( friend );
        setAddedFriends( addedFriends.concat( newlyAddedFriend ) );
    };

    let searchFriendsUI;
    if ( friendsSearchResponse.length !== 0 && friendsSearchResponse.success === false ) {
        searchFriendsUI = (
            <div><h3>{friendsSearchResponse.message}</h3></div>
        );
    } else if ( friendsSearchResponse.length !== 0 ) {
        searchFriendsUI = friendsSearchResponse.map( ( friend ) => {
            if ( friend.friends.includes( user.id ) ) {
                return (
                    <div key={friend._id}>
                        <h3>{friend.name}</h3>
                        <h4>Already Friends!</h4>
                        <p>{friend.email}</p>
                    </div>
                );
            }
            ;
            if ( friend.incomingFriendRequest.includes( user.email ) ) {
                return (
                    <div key={friend._id}>
                        <h3>{friend.name}</h3>
                        <h4>Friend Request Pending!</h4>
                        <p>{friend.email}</p>
                    </div>
                );
            }
            ;
            return (
                <div key={friend._id}>
                    <h3>{friend.name}</h3>
                    <p>{friend.email}</p>
                    <button ref={refAddFriend} onClick={() => {
                        if ( addedFriends.includes( friend.email ) ) return;
                        addFriendsToState( friend.email );
                        addFriendRequest( friend.email );
                    }}>{addedFriends.includes( friend.email ) ? "ADDED" : "ADD"}</button>

                </div>
            );
        } );
    }

    return (
        <div className={"add-friend-input-container"}>
            {props.loading ? <Loader/> : null}
            <h3>Add Friends</h3>
            <div className={"add-friend-input-inside"}>
                <input type="text" name={"email"} placeholder={"Email"}
                       ref={refSearchButton}/>
                <button onClick={searchForFriends}>Search</button>
            </div>
            {searchFriendsUI}
        </div>
    );
};

export default connect( mapStateToProps )( AddFriends );
