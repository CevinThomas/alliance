import React from "react";
import Heading from "../../components/textElements/heading";
import Button from "../../components/general/button";
import Paragraph from "../../components/textElements/paragraph";

const RightBox = () => {
    return (
        <div className={"account-box"}>
            <Heading type={"h3"} title={"Right Box"}/>
            <Paragraph title={"Lorem Ipsum"}/>
            <Button title={"Right Box CTA"}/>
        </div>
    );
};

export default RightBox;
