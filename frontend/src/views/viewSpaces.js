import React, {useEffect, useState} from "react";
import AllSpaces from "../containers/spaces/allSpaces";
import queryString from "query-string";
import ShowSingleSpace from "../containers/spaces/showSingleSpace";
import Navbar from "../components/nav/nav";
import checkLoggedIn from "../HOC/checkLoggedIn";


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


    return (
        <React.Fragment>
            <Navbar dark/>
            <div id={"spaces"}>
                {spacesUI}
            </div>
        </React.Fragment>
    );
};

export default checkLoggedIn( ViewSpaces );
