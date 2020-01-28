import React from "react";

import Navbar from "../components/nav/nav";
import checkLoggedIn from "../HOC/checkLoggedIn";
import AdminSideMenu from "../components/sideMenu/adminSideMenu";
import MainViewContainer from "../containers/account/mainViewContainer";

const Account = () => {
    return (
        <React.Fragment>
            <Navbar dark/>
            <div id={"account"}>
                <div id={"side-menu"}>
                    <AdminSideMenu/>
                </div>
                <div id={"main-view"}>
                    <MainViewContainer/>
                </div>

            </div>
        </React.Fragment>
    );
};

export default checkLoggedIn( Account );
