import React from "react";
import LeftBox from "../containers/account/leftBox";
import RightBox from "../containers/account/rightBox";
import LeftSection from "../containers/account/leftSection";
import RightSection from "../containers/account/rightSection";
import Overlay from "../components/general/overlay";
import Navbar from "../components/nav/nav";
import checkLoggedIn from "../HOC/checkLoggedIn";

const Account = () => {
    return (
        <React.Fragment>
            <Navbar/>
            <div id={"account"}>
                <Overlay/>
                <div id={"double-box-container"}>
                    <LeftBox/>
                    <RightBox/>
                </div>
                <div id={"double-section-container"}>
                    <LeftSection/>
                    <RightSection/>
                </div>

            </div>
        </React.Fragment>
    );
};

export default checkLoggedIn( Account );
