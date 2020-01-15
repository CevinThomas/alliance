import React, {useEffect} from "react";
import queryString from "query-string";
import {withRouter} from "react-router-dom";
import getToken from "../../helperMethods/getToken";
import Axios from "axios";
import {GET_FRIEND_INFO} from "../../constants/urls";
import {connect} from "react-redux";
import {VIEW_FRIEND} from "../../constants/friends";
import ShowFriend from "../../components/friends/showFriend";
import {isLoading} from "../../redux/actions";
import Loader from "../../components/loader/loader";

const mapStateToProps = state => {
    return {
        loading: state.isLoading
    };
};

const Friend = ( props ) => {

    getToken();
    const friendId = queryString.parse( props.history.location.search );

    useEffect( () => {
        const fetchFriend = async () => {
            props.dispatch( isLoading( true ) );
            const response = await Axios( {
                method: "POST",
                url: GET_FRIEND_INFO,
                data: {
                    friendId
                }
            } );
            props.dispatch( { type: VIEW_FRIEND, payload: response.data } );
            props.dispatch( isLoading( false ) );
        };
        fetchFriend();
    }, [] );


    return (
        <div id={"view-friend"}>
            {props.loading ? <Loader/> : null}
            <ShowFriend id={"friend"}/>
        </div>
    );
};

export default withRouter( connect( mapStateToProps )( Friend ) );
