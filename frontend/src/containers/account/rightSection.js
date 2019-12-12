import React from "react";
import Heading from "../../components/textElements/heading";
import Box from "../../components/general/box";

const RightSection = () => {
    return (
        <div id={"right-section"}>
            <Heading type={"h2"} title={"My Statistics"}/>
            <div className={"right-section-box-container"}>
                <Box class={"right-section-box"} type={"h3"} title={"Metric 1"}/>
                <Box class={"right-section-box"} type={"h3"} title={"Metric 2"}/>
                <Box class={"right-section-box"} type={"h3"} title={"Metric 3"}/>
                <Box class={"right-section-box"} type={"h3"} title={"Metric 4"}/>
                <Box class={"right-section-box"} type={"h3"} title={"Metric 5"}/>
                <Box class={"right-section-box"} type={"h3"} title={"Metric 6"}/>
            </div>
        </div>
    );
};

export default RightSection;
