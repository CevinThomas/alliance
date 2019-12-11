import React from "react";
import {Link} from "react-router-dom";
import Box from "../../components/general/box";
import OverlayTransition from "../../components/general/overlay-transition";

const BoxOne = () => {
    return (
        <div className={"boxes"}>
            <OverlayTransition id={"admin-overlay-one"}/>
            <Link className={"admin-box-link"} to={"/admin/create-space"}>
                <Box class={"box-container"} title={"Create Space"} type={"h2"}/>
            </Link>
        </div>
    );
};

export default BoxOne;
