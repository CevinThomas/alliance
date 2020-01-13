import React from "react";
import {Link} from "react-router-dom";
import Heading from "../textElements/heading";
import Paragraph from "../textElements/paragraph";

const SpaceCard = ( props ) => {
    console.log( props );

    let showMembers = false;
    props.space.members.length !== 0 ? showMembers = true : showMembers = false;

    let membersUI;
    if ( showMembers ) {
        membersUI = props.space.members.map( ( member ) => {
            return (
                <div key={member._id}>
                    <Heading title={member.name} type={"h4"}/>
                </div>
            );
        } );
    }


    return (
        <Link to={"/spaces/?id=" + props.space._id}>
            <div id={props.id} className={"space-card"}>
                <div className={"space-card-image"}></div>
                <div className={"space-card-text-container"}>
                    <div className={"space-card-text-inner"}>
                        <Heading title={props.space.name} type={"h3"}/>
                        {showMembers ?
                            <div>
                                <Paragraph title={"Members"}/>
                                {membersUI}
                            </div> : null
                        }

                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SpaceCard;
