import React from "react";
import CreateBox from "../containers/createSpace/createBox";
import Overlay from "../components/general/overlay";
import Navbar from "../components/nav/nav";
import checkLoggedIn from "../HOC/checkLoggedIn";


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

export default checkLoggedIn( CreateSpace );
