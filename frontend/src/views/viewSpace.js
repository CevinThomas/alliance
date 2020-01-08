import React, {useEffect, useState} from "react";
import queryString from "query-string";
import Heading from "../components/textElements/heading";

const ViewSpace = ( props ) => {

    const [ selectedSpaceId, setSelectedSpaceId ] = useState( "" );

    useEffect( () => {
        const spaceId = queryString.parse( props.history.location.search );
        setSelectedSpaceId( spaceId.spaceId );
    }, [] );

    useEffect( () => {

    }, [ selectedSpaceId ] );

    console.log( selectedSpaceId );
    let viewUI;
    if ( selectedSpaceId !== "" ) {
        viewUI = (
            <div>
                <Heading title={"Viewing Space"} type={"h2"}/>
            </div>
        );
    } else {
        viewUI = (
            <div>
                <Heading title={"Sorry, no space was found"} type={"h1"}/>
            </div>
        );
    }

    return (
        <div>
            {viewUI}
        </div>
    );
};

export default ViewSpace;
