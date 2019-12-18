import React from "react";
import {connect} from "react-redux";
import Input from "../../components/forms/input";
import Button from "../../components/general/button";
import Axios from "axios";
import * as friendConstants from "../../constants/friends";

const mapStateToProps = state => {
    return { friend: state.addFriend };
};

const AddFriends = ( props ) => {

    const handleInputChange = ( e ) => {
        props.dispatch( { type: friendConstants.ADD_FRIEND, payload: e.target.value } );
    };

    //TODO: Change URL to constant
    const addFriendRequest = () => {
        Axios( {
            method: "POST",
            url: "http://localhost:8000/api/add-friends",
            data: {
                friend: props.friend
            }
        } );
    };

    return (
        <div>
            <h1>Add Friends</h1>
            <div>
                <Input onchange={handleInputChange} placeholder={"Email"} name={"email"}/>
                <Button onclick={addFriendRequest} title={"Add Friend"}/>
            </div>
        </div>
    );
};

export default connect( mapStateToProps )( AddFriends );
