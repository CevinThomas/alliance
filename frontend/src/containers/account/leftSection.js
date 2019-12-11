import React from "react";
import Heading from "../../components/textElements/heading";
import Paragraph from "../../components/textElements/paragraph";

const LeftSection = () => {
    return (
        <div id={"left-section"}>
            <Heading type={"h2"} title={"About Me"}/>
            <Paragraph title={"This could be some general information about the user"}/>
            <Paragraph title={"This could be some general information about the user"}/>
            <Paragraph title={"This could be some general information about the user"}/>
            <Paragraph title={"This could be some general information about the user"}/>

        </div>
    );
};

export default LeftSection;
