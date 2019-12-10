import React from "react";
import Heading from "../../components/textElements/heading";
import Button from "../../components/general/button";
import Paragraph from "../../components/textElements/paragraph";

const LeftBox = () => {
    return (
        <div>
            <Heading type={"h3"} title={"Left Box"}/>
            <Paragraph title={"Lorem Ipsum"}/>
            <Button title={"Left Box CTA"}/>
        </div>
    );
};

export default LeftBox;
