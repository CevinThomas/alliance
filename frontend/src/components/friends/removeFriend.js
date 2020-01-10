import React from "react";
import Button from "../general/button";
import {connect} from "react-redux";
import Axios from "axios";
import {REMOVE_FRIEND} from "../../constants/urls";
import {withRouter} from "react-router";

const mapStateToProps = state => {
    return { friend: state.viewFriend };
};

const RemoveFriend = ( props ) => {

    console.log( props );

    const removeFriendHandler = async () => {
        const response = await Axios( {
            method: "POST",
            url: REMOVE_FRIEND,
            data: {
                friendId: props.friend._id
            }
        } );
        console.log( response.data );
        if ( response.data.success ) return props.history.push( "/admin/manage-challengers" );
    };

    return <Button onclick={removeFriendHandler} title={"Remove Friend"} type={props.type}/>;
};

export default connect( mapStateToProps )( withRouter( RemoveFriend ) );
