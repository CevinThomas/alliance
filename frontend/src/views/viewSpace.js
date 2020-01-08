import React, {useEffect, useState} from "react";
import queryString from "query-string";
import Heading from "../components/textElements/heading";
import Axios from "axios";
import * as urlConstants from "../constants/urls";
import getToken from "../helperMethods/getToken";
import Paragraph from "../components/textElements/paragraph";

const ViewSpace = ( props ) => {

    getToken();

    const [ selectedSpaceId, setSelectedSpaceId ] = useState( "" );
    const [ responseSpace, setResponseSpace ] = useState( null );
    const [ startDisplayingData, setStartDisplayingData ] = useState( false );

    useEffect( () => {
        const spaceId = queryString.parse( props.history.location.search );
        setSelectedSpaceId( spaceId.spaceId );
    }, [] );

    useEffect( () => {
        if ( selectedSpaceId !== "" ) {
            Axios( {
                method: "POST",
                url: urlConstants.GET_SINGLE_SPACE,
                data: {
                    spaceId: selectedSpaceId.toString()
                }
            } ).then( ( response ) => {
                setResponseSpace( response.data );
                setStartDisplayingData( true );
            } ).catch( e => console.log( e ) );
        }
    }, [ selectedSpaceId ] );

    let viewUI;
    if ( startDisplayingData === true ) {
        if ( responseSpace.length !== 0 ) {
            viewUI = (
                <div>
                    <Heading title={responseSpace.name} type={"h2"}/>
                    <Paragraph title={responseSpace.description}/>
                    <div>
                        <Heading title={"Members"} type={"h3"}/>
                        {responseSpace.challengers.map( ( challenger ) => {
                            return <div key={challenger}><Heading title={challenger} type={"h4"}/></div>;
                        } )}
                    </div>
                </div>
            );
        } else {
            viewUI = (
                <div>
                    <Heading title={"Sorry, no space was found"} type={"h1"}/>
                </div>
            );
        }
    }

    return (
        <div>
            {viewUI}
        </div>
    );
};

export default ViewSpace;
