import React from "react";
import {connect} from "react-redux";
import Input from "../../components/forms/input";
import Button from "../../components/general/button";
import Axios from "axios";
import * as friendConstants from "../../constants/friends";
import {isLoading} from "../../redux/actions";
import Loader from "../../components/loader/loader";

const mapStateToProps = state => {
    return { friend: state.addFriend, loading: state.isLoading };
};

const AddFriends = ( props ) => {

    const handleInputChange = ( e ) => {
        props.dispatch( { type: friendConstants.ADD_FRIEND, payload: e.target.value } );
    };

    //TODO: Change URL to constant
    const addFriendRequest = () => {
        props.dispatch( isLoading( true ) );
        Axios( {
            method: "POST",
            url: "http://localhost:8000/api/add-friends",
            data: {
                friend: props.friend
            }
        } ).then( ( r ) => {
            props.dispatch( isLoading( false ) );
        } );
    };

    return (
        <div>
            {props.loading ? <Loader/> : null}
            <h1>Add Friends</h1>
            <div>
                <Input onchange={handleInputChange} placeholder={"Email"} name={"email"}/>
                <Button onclick={addFriendRequest} title={"Add Friend"}/>
            </div>
        </div>
    );
};

export default connect( mapStateToProps )( AddFriends );
