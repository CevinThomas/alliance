import React, {useEffect, useState} from "react";
import AllSpaces from "../containers/spaces/allSpaces";
import queryString from "query-string";
import ShowSingleSpace from "../containers/spaces/showSingleSpace";

const ViewSpaces = ( props ) => {

    const [ queryParams, setQueryParams ] = useState( "" );
    const [ reloadQuery, setReloadQuery ] = useState( 0 );

    const reloadQueryHandler = () => {
        setReloadQuery( reloadQuery + 1 );
    };

    const params = queryString.parse( props.history.location.search );

    let spacesUI;
    if ( params.id !== undefined ) {
        spacesUI = (
            <ShowSingleSpace reloadQuery={reloadQueryHandler} userId={params.userId} spaceId={params.id}/>
        );
    } else {
        spacesUI = (
            <AllSpaces/>
        );
    }

    useEffect( () => {
        setQueryParams( params );
    }, [ reloadQuery ] );


    console.log( queryParams );

    console.log( "RERUN" );

    return (
        <div id={"spaces"}>
            {spacesUI}
        </div>
    );
};

export default ViewSpaces;
