import React, {useEffect} from "react";
import queryString from "query-string";
import {withRouter} from "react-router-dom";
import getToken from "../../helperMethods/getToken";
import Axios from "axios";
import {GET_FRIEND_INFO} from "../../constants/urls";
import {connect} from "react-redux";
import {VIEW_FRIEND} from "../../constants/friends";

const mapStateToProps = state => {
    return { friend: state.viewFriend };
};

const Friend = ( props ) => {

    getToken();
    const friendId = queryString.parse( props.history.location.search );

    useEffect( () => {
        const fetchFriend = async () => {
            const response = await Axios( {
                method: "POST",
                url: GET_FRIEND_INFO,
                data: {
                    friendId
                }
            } );
            props.dispatch( { type: VIEW_FRIEND, payload: response.data } );
        };
        fetchFriend();
    }, [] );

    console.log( props.friend );

    return (
        <div>
            <h1>Viewing Friend</h1>
        </div>
    );
};

export default withRouter( connect( mapStateToProps )( Friend ) );
