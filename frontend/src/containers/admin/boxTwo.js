import React from "react";
import Box from "../../components/general/box";
import OverlayTransition from "../../components/general/overlay-transition";

const BoxTwo = () => {
    return (
        <div id={"box-two"} className={"boxes"}>
            <OverlayTransition id={"admin-overlay-two"}/>
            <Box class={"box-container"} title={"Create Challenges"} type={"h2"}/>
        </div>
    );
};

export default BoxTwo;
