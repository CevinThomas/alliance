import React from "react";
import AllSpaces from "../containers/spaces/allSpaces";
import queryString from "query-string";
import ShowSingleSpace from "../containers/spaces/showSingleSpace";

const ViewSpaces = ( props ) => {

    const spaceId = queryString.parse( props.history.location.search );

    let spacesUI;
    if ( spaceId.id !== undefined ) {
        spacesUI = (
            <ShowSingleSpace spaceId={spaceId.id}/>
        );
    } else {
        spacesUI = (
            <AllSpaces/>
        );
    }

    return (
        <div id={"spaces"}>
            {spacesUI}
        </div>
    );
};

export default ViewSpaces;
