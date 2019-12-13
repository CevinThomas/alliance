import React from "react";
import CreateBox from "../containers/createSpace/createBox";
import Overlay from "../components/general/overlay";

const CreateSpace = () => {
    return (
        <div id={"create-space"}>
            <Overlay/>
            <CreateBox/>
        </div>
    );
};

export default CreateSpace;
