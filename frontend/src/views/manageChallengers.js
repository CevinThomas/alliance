import React from "react";
import FriendRequests from "../containers/manageChallengers/friendRequests";
import AddFriends from "../containers/manageChallengers/addFriends";
import CurrentFriends from "../containers/manageChallengers/currentFriends";
import Navbar from "../components/nav/nav";
import checkLoggedIn from "../HOC/checkLoggedIn";


const ManageChallengers = ( props ) => {

    return (
        <React.Fragment>
            <Navbar dark/>
            <div id={"manage-friends-background"}>

                <div id={"manage-friends"}>
                    <div className={"full-width-container"}>
                        <div className={"add-friends"}>
                            <AddFriends/>
                        </div>
                    </div>
                    <div className={"main-container"}>
                        <div className={"friend-requests"}>
                            <FriendRequests/>
                        </div>
                        <div className={"current-friends"}>
                            <CurrentFriends/>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default checkLoggedIn( ManageChallengers );
