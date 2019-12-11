import React from "react";
import Box from "../../components/general/box";
import OverlayTransition from "../../components/general/overlay-transition";
import {Link} from "react-router-dom";

const BoxThree = () => {
    return (
        <div className={"boxes"}>
            <OverlayTransition id={"admin-overlay-three"}/>
            <Link className={"admin-box-link"} to={"/admin/manage-challengers"}>
                <Box
                    message={"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters"}
                    class={"box-container"} title={"Manage Challengers"} type={"h2"}/>
            </Link>
        </div>
    );
};

export default BoxThree;
