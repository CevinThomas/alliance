import React, {useEffect, useState} from "react";
import Axios from "axios";
import * as urlConstants from "../../constants/urls";
import Heading from "../../components/textElements/heading";
import Paragraph from "../../components/textElements/paragraph";

const CurrentSpaces = () => {

    const [ currentSpaces, setCurrentSpaces ] = useState( [] );

    useEffect( () => {
        Axios( {
            method: "GET",
            url: urlConstants.GET_SPACES_FROM_USER
        } ).then( r => setCurrentSpaces( r.data ) ).catch( e => console.log( e ) );
    }, [] );

    console.log( currentSpaces );

    let spacesUI;
    if ( currentSpaces.length !== 0 ) {
        spacesUI = currentSpaces.map( ( space ) => {
            return (
                <div key={space._id}>
                    <Heading title={space.name} type={"h3"}/>
                    <Paragraph title={space._id}/>
                </div>
            );
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
