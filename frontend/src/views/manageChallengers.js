import React from "react";
import FriendRequests from "../containers/manageChallengers/friendRequests";
import AddFriends from "../containers/manageChallengers/addFriends";
import CurrentFriends from "../containers/manageChallengers/currentFriends";
import Navbar from "../components/nav/nav";

const ManageChallengers = ( props ) => {

    return (
        <React.Fragment>
            <Navbar dark/>
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
        </React.Fragment>
    );
};

export default ManageChallengers;
