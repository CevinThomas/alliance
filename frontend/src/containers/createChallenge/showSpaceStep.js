import React, {useEffect} from "react";
import {connect} from "react-redux";
import Axios from "axios";
import * as urlConstants from "../../constants/urls";
import * as taskConstants from "../../constants/tasks";
import * as spaceConstants from "../../constants/space";
import getToken from "../../helperMethods/getToken";
import {isLoading} from "../../redux/actions";
import Loader from "../../components/loader/loader";

const mapStateToProps = state => {
    return { chosenTaskType: state.chosenTaskType, usersSpace: state.usersSpaces, loading: state.isLoading };
};
const ShowSpaceStep = ( props ) => {

    const handleSpaceClick = ( e ) => {
        props.dispatch( { type: taskConstants.CHOSEN_SPACE, payload: e.target.dataset.spaceId } );
    };

    getToken();

    useEffect( () => {
        props.dispatch( isLoading( true ) );
        Axios( {
            method: "GET",
            url: urlConstants.GET_SPACES_FROM_USER
        } ).then( ( response ) => {
            props.dispatch( { type: spaceConstants.USERS_SPACES, payload: response.data.allSpaces } );
            props.dispatch( isLoading( false ) );
        } );
    }, [] );

    let showSpacesUI;
    if ( props.usersSpace.length !== 0 ) {
        showSpacesUI = props.usersSpace.map( ( singleSpace ) => {
            return (
                <div key={singleSpace._id}>
                    <h2 onClick={handleSpaceClick} data-space-id={singleSpace._id}>{singleSpace.name}</h2>
                </div>
            );
        } );
    }

    return (
        <div>
            {props.loading ? <Loader/> : null}
            <h2>{`You chose ${props.chosenTaskType}`}</h2>
            <h3>Please choose a Space to add challenge to</h3>
            <div>
                {showSpacesUI}
            </div>
        </div>
    );
};

export default connect( mapStateToProps )( ShowSpaceStep );
