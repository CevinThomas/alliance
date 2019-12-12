import React from "react";
import Heading from "../../components/textElements/heading";
import Paragraph from "../../components/textElements/paragraph";
import OverlayTransition from "../../components/general/overlay-transition";

const RightBox = () => {
    return (
        <div className={"account-box"}>
            <OverlayTransition/>
            <Heading type={"h3"} title={"Right Box"}/>
            <Paragraph title={"Lorem Ipsum"}/>
        </div>
    );
};

export default RightBox;
