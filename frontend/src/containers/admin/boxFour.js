import React from "react";
import Box from "../../components/general/box";
import OverlayTransition from "../../components/general/overlay-transition";
import {Link} from "react-router-dom";

const BoxFour = () => {
    return (
        <div id={"box-four"} className={"boxes"}>
            <OverlayTransition id={"admin-overlay-four"}/>
            <Link className={"admin-box-link"} to={"/admin/edit-spaces-challenges"}>
                <Box class={"box-container"} title={"Edit Spaces/Challenges"} type={"h2"}/>
            </Link>
        </div>
    );
};

export default BoxFour;
