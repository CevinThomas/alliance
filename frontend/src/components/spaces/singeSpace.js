import React from "react";
import Heading from "../textElements/heading";
import Paragraph from "../textElements/paragraph";

const SingleSpace = ( props ) => {

    console.log( props.space );

    let spaceUI;
    if ( props.space.length !== 0 ) {
        spaceUI = props.space.map( ( space ) => {
            return space.members.map( ( member ) => {
                return (
                    <div key={member._id}>
                        <Heading title={member.name} type={"h3"}/>
                        <div>
                            <Paragraph title={"Tasks"}/>
                        </div>
                    </div>
                );
            } );
        } );
    }

    return (
        <div>
            {spaceUI}
        </div>
    );
};

export default SingleSpace;
