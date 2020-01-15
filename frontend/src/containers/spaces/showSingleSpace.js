import React, {useEffect} from "react";
import SingleSpace from "../../components/spaces/singeSpace";
import Axios from "axios";
import getToken from "../../helperMethods/getToken";
import {GET_SPACE_WITH_LOOKUP} from "../../constants/urls";
import {connect} from "react-redux";
import {SELECTED_SPACE} from "../../constants/space";
import {withRouter} from "react-router-dom";
import SingleUserInSpace from "../../components/spaces/singleUserInSpace";
import Heading from "../../components/textElements/heading";

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
        console.log( "RUNNING" );
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

    let UI;
    if ( props.selectedSpace === "Invalid Space ID" ) {
        UI = (
            <div>
                <Heading title={"No Space Found"} type={"h1"}/>
            </div>
        );
    } else {
        if ( props.userId !== undefined ) {
            UI = <SingleUserInSpace spaceId={props.spaceId} userId={props.userId}/>;
        } else {
            UI = <SingleSpace reloadQuery={props.reloadQueryHandler} space={props.selectedSpace}/>;
        }
    }

    return (
        <div>
            {UI}
        </div>
    );
};

export default connect( mapStateToProps, mapDispatchToProps )( withRouter( ShowSingleSpace ) );
