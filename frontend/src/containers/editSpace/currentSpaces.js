import React, {useEffect, useState} from "react";
import Axios from "axios";
import * as urlConstants from "../../constants/urls";
import Heading from "../../components/textElements/heading";
import Paragraph from "../../components/textElements/paragraph";
import {Link} from "react-router-dom";

const CurrentSpaces = ( props ) => {

    const [ currentSpaces, setCurrentSpaces ] = useState( [] );
    const [ ownerOfTheseSpaces, setOwnerOfTheseSpaces ] = useState( [] );

    useEffect( () => {
        Axios( {
            method: "GET",
            url: urlConstants.GET_SPACES_FROM_USER
        } ).then( ( response ) => {
            setCurrentSpaces( response.data.allSpaces );
            setOwnerOfTheseSpaces( response.data.ownerOf );
        } ).catch( e => console.log( e ) );
    }, [] );

    let spacesUI;
    if ( currentSpaces.length !== 0 ) {
        spacesUI = currentSpaces.map( ( space ) => {
            if ( ownerOfTheseSpaces.includes( space._id ) ) {
                return (
                    <div key={space._id}>
                        <Heading title={space.name} type={"h3"}/>
                        <Paragraph title={space._id}/>
                        <Link to={"/admin/edit-space/?spaceId=" + space._id}>Edit</Link>
                    </div>
                );
            } else {
                return (
                    <div key={space._id}>
                        <Heading title={space.name} type={"h3"}/>
                        <Paragraph title={space._id}/>
                        <Link to={"/admin/view-space/?spaceId=" + space._id}>View</Link>
                    </div>
                );
            }
        } );
    }

    return (
        <div>
            <h1>Current Spaces</h1>
            {spacesUI}
        </div>
    );
};

export default CurrentSpaces;
