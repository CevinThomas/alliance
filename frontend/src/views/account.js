import React from "react";
import LeftBox from "../containers/account/leftBox";
import RightBox from "../containers/account/rightBox";
import LeftSection from "../containers/account/leftSection";
import RightSection from "../containers/account/rightSection";
import Overlay from "../components/general/overlay";

const Account = () => {
    return (
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
    );
};

export default Account;