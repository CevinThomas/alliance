import React from "react";
import Box from "../../components/general/box";
import OverlayTransition from "../../components/general/overlay-transition";

const BoxThree = () => {
    return (
        <div className={"boxes"}>
            <OverlayTransition id={"admin-overlay-three"}/>
            <Box class={"box-container"} title={"Manage Challengers"} type={"h2"}/>
        </div>
    );
};

export default BoxThree;
