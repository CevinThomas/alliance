import React from "react";
import Box from "../../components/general/box";
import OverlayTransition from "../../components/general/overlay-transition";

const BoxOne = () => {
    return (
        <div className={"boxes"}>
            <OverlayTransition id={"admin-overlay-one"}/>
            <Box class={"box-container"} title={"Create Space"} type={"h2"}/>
        </div>
    );
};

export default BoxOne;
