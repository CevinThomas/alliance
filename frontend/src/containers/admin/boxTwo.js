import React from "react";
import Box from "../../components/general/box";
import OverlayTransition from "../../components/general/overlay-transition";
import {Link} from "react-router-dom";

const BoxTwo = () => {
    return (
        <div id={"box-two"} className={"boxes"}>
            <OverlayTransition id={"admin-overlay-two"}/>
            <Link className={"admin-box-link"} to={"/admin/create-challenges"}>
                <Box class={"box-container"} title={"Create Challenges"} type={"h2"}/>
            </Link>
        </div>
    );
};

export default BoxTwo;
