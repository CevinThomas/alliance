import React from "react";
import {Link} from "react-router-dom";
import Heading from "../textElements/heading";
import Paragraph from "../textElements/paragraph";

const SpaceCard = ( props ) => {
    return (
        <Link to={"/spaces/?id="}>
            <div id={props.id} className={"space-card"}>
                <div className={"space-card-image"}></div>
                <div className={"space-card-text-container"}>
                    <div className={"space-card-text-inner"}>
                        <Heading title={"Space"} type={"h3"}/>
                        <Paragraph title={"Members"}/>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SpaceCard;
