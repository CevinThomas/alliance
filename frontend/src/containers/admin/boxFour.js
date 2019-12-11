import React from "react";
import Box from "../../components/general/box";
import OverlayTransition from "../../components/general/overlay-transition";

const BoxFour = () => {
    return (
        <div id={"box-four"} className={"boxes"}>
            <OverlayTransition id={"admin-overlay-four"}/>
            <Box class={"box-container"} title={"Box Four"} type={"h2"}/>
        </div>
    );
};

export default BoxFour;
