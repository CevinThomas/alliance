import React from "react";
import Heading from "../../components/textElements/heading";
import Paragraph from "../../components/textElements/paragraph";

const RightSection = () => {
    return (
        <div id={"right-section"}>
            <Heading type={"h2"} title={"My Statistics"}/>
            <Paragraph title={"This could be some general information about the user"}/>
            <Paragraph title={"This could be some general information about the user"}/>
            <Paragraph title={"This could be some general information about the user"}/>
            <Paragraph title={"This could be some general information about the user"}/>
        </div>
    );
};

export default RightSection;
