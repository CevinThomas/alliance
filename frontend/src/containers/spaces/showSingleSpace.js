import React, {useEffect} from "react";
import SingleSpace from "../../components/spaces/singeSpace";
import Axios from "axios";
import getToken from "../../helperMethods/getToken";
import {GET_SPACE_WITH_LOOKUP} from "../../constants/urls";
import {connect} from "react-redux";
import {SELECTED_SPACE} from "../../constants/space";

const mapDispatchToProps = dispatch => {
    return {
        sendSelectedSpace: ( space ) => dispatch( { type: SELECTED_SPACE, payload: space } )
    };
};

const mapStateToProps = state => {
    return {
        selectedSpace: state.selectedSpace
    };
};

const ShowSingleSpace = ( props ) => {

    getToken();

    useEffect( () => {
        const fetchSpace = async () => {
            const response = await Axios( {
                method: "POST",
                url: GET_SPACE_WITH_LOOKUP,
                data: {
                    spaceId: props.spaceId
                }
            } );
            props.sendSelectedSpace( response.data );
        };
        fetchSpace();
    }, [] );

    return (
        <div>
            <SingleSpace space={props.selectedSpace}/>
        </div>
    );
};

export default connect( mapStateToProps, mapDispatchToProps )( ShowSingleSpace );
