import React from "react";
import {Link} from "react-router-dom";
import Heading from "../../components/textElements/heading";

const GoToSpaces = () => {
    return (
        <Link to={"/spaces"}>
            <div>
                <Heading title={"View Your Current Spaces"} type={"h2"}/>
            </div>
        </Link>
    );
};

export default GoToSpaces;
