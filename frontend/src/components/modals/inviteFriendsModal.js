import React, {useState} from "react";
import Overlay from "../general/overlay";
import {connect} from "react-redux";
import Button from "../general/button";
import Axios from "axios";
import {ADD_USERS_TO_SPACE} from "../../constants/urls";

const mapStateToProps = state => {
    return {
        friends: state.friendsList
    };
};

const InviteFriendsModal = ( props ) => {

    const updateSpaceWithNewMembers = () => {
        Axios( {
            method: "POST",
            url: ADD_USERS_TO_SPACE,
            data: {
                membersToInvite: friendsToInvite,
                spaceID: props.spaceId
            }
        } );
    };

    const [ friendsToInvite, setFriendsToInvite ] = useState( [] );

    const inviteFriendsHandler = ( friendsEmail ) => {
        if ( friendsToInvite.includes( friendsEmail ) ) return;
        let newFriend = [];
        newFriend.push( friendsEmail );
        setFriendsToInvite( friendsToInvite.concat( newFriend ) );
    };

    const removeFriendsHandler = ( friendsEmail ) => {
        const index = friendsToInvite.indexOf( friendsEmail );
        const freshMembersToRemove = [ ...friendsToInvite ];
        freshMembersToRemove.splice( index, 1 );
        setFriendsToInvite( freshMembersToRemove );
    };

    const determineButtonState = ( { target } ) => {
        if ( target.innerHTML === "Remove" ) {
            removeFriendsHandler( target.attributes[0].nodeValue );
        } else {
            inviteFriendsHandler( target.attributes[0].nodeValue );
        }
    };

    return (
        <div className={"invite-friends-modal"}>
            <Overlay/>
            <div className={"friends-modal-inner"}>
                <h2>Friends To invite</h2>
                {props.friends.length !== 0 ? props.friends.map( ( friend ) => {
                    return <div key={friend.email}>
                        <h3>{friend.name}</h3>
                        {friendsToInvite.includes( friend.email ) ? <span>Inviting {friend.name}</span> : null}
                        <h4>{friend.email}</h4>

                        <Button data={friend.email}
                                onclick={determineButtonState}
                                title={friendsToInvite.includes( friend.email ) ? "Remove" : "Invite"}/>
                        <button onClick={updateSpaceWithNewMembers}>Update Space</button>
                    </div>;
                } ) : null}
            </div>

        </div>
    );
};

export default connect( mapStateToProps, null )( InviteFriendsModal );
