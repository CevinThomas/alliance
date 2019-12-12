import React from "react";
import {Link} from "react-router-dom";
import Heading from "../../components/textElements/heading";
import Paragraph from "../../components/textElements/paragraph";
import OverlayTransition from "../../components/general/overlay-transition";

const LeftBox = () => {
    return (
        <div className={"account-box"}>
            <OverlayTransition/>
            <Link to={"/admin"}>
                <Heading type={"h3"} title={"Admin"}/>
                <Paragraph title={"Enter the admin area, where you can create Challenge Spaces, or Challenge Tasks"}/>
            </Link>
        </div>
    );
};

export default LeftBox;
