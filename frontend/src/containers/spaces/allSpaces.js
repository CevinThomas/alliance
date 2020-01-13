import React, {useEffect} from "react";
import SpaceCard from "../../components/spaces/spaceCard";
import Axios from "axios";
import getToken from "../../helperMethods/getToken";
import {GET_ALL_SPACES} from "../../constants/urls";
import {connect} from "react-redux";
import {SEND_CURRENT_SPACES} from "../../constants/space";

const mapDispatchToProps = dispatch => {
    return ({
        sendCurrentSpaces: ( data ) => {dispatch( { type: SEND_CURRENT_SPACES, payload: data } );}
    });
};

const mapStateToProps = state => {
    return ({
        currentSpaces: state.currentSpaces
    });
};

const AllSpaces = ( props ) => {

    getToken();

    useEffect( () => {
        const fetchSpaces = async () => {
            const response = await Axios( {
                method: "GET",
                url: GET_ALL_SPACES
            } );
            props.sendCurrentSpaces( response.data );
            console.log( response );
        };
        fetchSpaces();
    }, [] );

    let spacesUI;
    if ( props.currentSpaces.length !== 0 ) {
        spacesUI = props.currentSpaces.map( ( space ) => {
            return <SpaceCard space={space}/>;
        } );
    }


    return (
        <div id={"all-spaces"}>
            {spacesUI}
        </div>
    );
};

export default connect( mapStateToProps, mapDispatchToProps )( AllSpaces );
