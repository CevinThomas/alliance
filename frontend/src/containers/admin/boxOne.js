import React from "react";
import {Link} from "react-router-dom";
import Box from "../../components/general/box";
import OverlayTransition from "../../components/general/overlay-transition";

const BoxOne = () => {
    return (
        <div className={"boxes"}>
            <OverlayTransition id={"admin-overlay-one"}/>
            <Link className={"admin-box-link"} to={"/admin/create-space"}>
                <Box
                    message={"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters"}
                    class={"box-container"} title={"Create Space"} type={"h2"}/>
            </Link>
        </div>
    );
};

export default BoxOne;
