import React from "react";
import FriendRequests from "../containers/manageChallengers/friendRequests";
import AddFriends from "../containers/manageChallengers/addFriends";
import CurrentFriends from "../containers/manageChallengers/currentFriends";

const ManageChallengers = ( props ) => {

    return (
        <div>
            <div>
                <FriendRequests/>
            </div>
            <div>
                <AddFriends/>
            </div>
            <div>
                <CurrentFriends/>
            </div>
        </div>
    );
};

export default ManageChallengers;
