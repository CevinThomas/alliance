import React from "react";
import LeftBox from "../containers/account/leftBox";
import RightBox from "../containers/account/rightBox";

const Account = () => {
    return (
        <div id={"account"}>
            <div id={"double-box-container"}>
                <LeftBox/>
                <RightBox/>
            </div>
        </div>
    );
};

export default Account;
