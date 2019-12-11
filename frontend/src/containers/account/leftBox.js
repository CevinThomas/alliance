import React from "react";
import {Link} from "react-router-dom";
import Heading from "../../components/textElements/heading";
import Button from "../../components/general/button";
import Paragraph from "../../components/textElements/paragraph";

const LeftBox = () => {
    return (
        <div className={"account-box"}>
            <Heading type={"h3"} title={"Admin"}/>
            <Paragraph title={"Enter the admin area, where you can create Challenge Spaces, or Challenge Tasks"}/>
            <Link to={"/admin"}>
                <Button title={"Admin"}/>
            </Link>
        </div>
    );
};

export default LeftBox;
