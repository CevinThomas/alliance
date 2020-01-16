import React, {useEffect} from "react";
import Axios from "axios";
import getToken from "../../helperMethods/getToken";
import {GET_ALL_SPACES} from "../../constants/urls";
import {connect} from "react-redux";
import {SEND_CURRENT_SPACES} from "../../constants/space";
import SpaceCard from "../../components/spaces/spaceCard";
import {isLoading} from "../../redux/actions";
import Loader from "../../components/loader/loader";

const mapStateToProps = state => {
    return ({
        currentSpaces: state.currentSpaces,
        loading: state.isLoading
    });
};

const AllSpaces = ( props ) => {

    getToken();

    useEffect( () => {

        const fetchSpaces = async () => {
            props.dispatch( isLoading( true ) );
            const response = await Axios( {
                method: "GET",
                url: GET_ALL_SPACES
            } );
            props.dispatch( { type: SEND_CURRENT_SPACES, payload: response.data } );
            props.dispatch( isLoading( false ) );
        };
        fetchSpaces();
    }, [] );

    let spacesUI;
    if ( props.currentSpaces.length !== 0 ) {
        spacesUI = props.currentSpaces.map( ( space ) => {
            return <SpaceCard key={space._id} space={space}/>;
        } );
    }


    return (
        <div id={"all-spaces"}>
            {props.loading ? <Loader/> : null}
            {spacesUI}
        </div>
    );
};

export default connect( mapStateToProps )( AllSpaces );
