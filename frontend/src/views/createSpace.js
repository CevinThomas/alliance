import React from "react";
import CreateBox from "../containers/createSpace/createBox";
import Overlay from "../components/general/overlay";
import Navbar from "../components/nav/nav";

const CreateSpace = () => {
    return (
        <React.Fragment>
            <Navbar/>
            <div id={"create-space"}>
                <Overlay/>
                <CreateBox/>
            </div>
        </React.Fragment>
    );
};

export default CreateSpace;
