import React, {useEffect} from "react";
import Axios from "axios";
import getToken from "../../helperMethods/getToken";
import {GET_ALL_SPACES} from "../../constants/urls";
import {connect} from "react-redux";
import {SEND_CURRENT_MEMBERS, SEND_CURRENT_SPACES} from "../../constants/space";
import SpaceCard from "../../components/spaces/spaceCard";

const mapDispatchToProps = dispatch => {
    return ({
        sendCurrentSpaces: ( data ) => {dispatch( { type: SEND_CURRENT_SPACES, payload: data } );},
        sendCurrentMembers: ( members ) => {dispatch( { type: SEND_CURRENT_MEMBERS, payload: members } );}
    });
};

const mapStateToProps = state => {
    return ({
        currentSpaces: state.currentSpaces,
        currentMembers: state.currentMembers
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
            props.sendCurrentSpaces( response.data.spaces );
            //props.sendCurrentMembers( response.data.members );
        };
        fetchSpaces();
    }, [] );

    /*useEffect( () => {
        const sendUserIds = async () => {
            const response = await Axios( {
                method: "POST",
                url:
            } );
        };
        sendUserIds();
    } );*/

    let spacesUI;
    let members = [];
    if ( props.currentSpaces.length !== 0 ) {
        spacesUI = props.currentSpaces.map( ( space ) => {
            props.currentMembers.map( ( member ) => {
                if ( member.spaces.includes( space._id ) ) {
                    members.push( member );
                }
            } );
            return <SpaceCard members={members} space={space}/>;
        } );
    }


    return (
        <div id={"all-spaces"}>
            {spacesUI}
        </div>
    );
};

export default connect( mapStateToProps, mapDispatchToProps )( AllSpaces );
