import React, {useEffect} from "react";
import SingleSpace from "../../components/spaces/singeSpace";
import Axios from "axios";
import getToken from "../../helperMethods/getToken";
import {GET_SPACE_WITH_LOOKUP} from "../../constants/urls";

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
            console.log( response );
        };
        fetchSpace();
    } );

    return (
        <div>
            <SingleSpace/>
        </div>
    );
};

export default ShowSingleSpace;
