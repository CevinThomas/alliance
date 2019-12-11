import React from "react";
import Box from "../../components/general/box";
import OverlayTransition from "../../components/general/overlay-transition";
import {Link} from "react-router-dom";

const BoxThree = () => {
    return (
        <div className={"boxes"}>
            <OverlayTransition id={"admin-overlay-three"}/>
            <Link className={"admin-box-link"} to={"/admin/manage-challengers"}>
                <Box class={"box-container"} title={"Manage Challengers"} type={"h2"}/>
            </Link>
        </div>
    );
};

export default BoxThree;
