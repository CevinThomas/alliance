import React from "react";
import Friend from "../containers/friends/friend";
import Navbar from "../components/nav/nav";
import checkLoggedIn from "../HOC/checkLoggedIn";


const ViewFriend = () => {
    return (
        <React.Fragment>
            <Navbar/>
            <div id={"view-friend-container"}>
                <Friend/>
            </div>
        </React.Fragment>
    );
};

export default checkLoggedIn( ViewFriend );
