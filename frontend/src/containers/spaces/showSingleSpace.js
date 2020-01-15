import React, {useEffect, useState} from "react";
import SingleSpace from "../../components/spaces/singeSpace";
import Axios from "axios";
import getToken from "../../helperMethods/getToken";
import {GET_SPACE_WITH_LOOKUP} from "../../constants/urls";
import {connect} from "react-redux";
import {SELECTED_SPACE} from "../../constants/space";
import queryString from "query-string";
import {withRouter} from "react-router-dom";
import SingleUserInSpace from "../../components/spaces/singleUserInSpace";

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

    const [ queryParams, setQueryParams ] = useState( "" );
    const [ reloadQuery, setReloadQuery ] = useState( 0 );

    const reloadQueryHandler = () => {
        setReloadQuery( reloadQuery + 1 );
    };


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

    useEffect( () => {
        const params = queryString.parse( props.history.location.search );
        setQueryParams( params );
    }, [ reloadQuery ] );


    return (
        <div>
            {
                queryParams.userId !== undefined ?
                    <SingleUserInSpace spaceId={queryParams.id} userId={queryParams.userId}/> :
                    <SingleSpace reloadQuery={reloadQueryHandler} space={props.selectedSpace}/>
            }
        </div>
    );
};

export default connect( mapStateToProps, mapDispatchToProps )( withRouter( ShowSingleSpace ) );
