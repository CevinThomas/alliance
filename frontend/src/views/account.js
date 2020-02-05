import React from "react";

import Navbar from "../components/nav/nav";
import checkLoggedIn from "../HOC/checkLoggedIn";
import MainViewContainer from "../containers/account/mainViewContainer";
import Layout from "../components/layout";
import Overlay from "../components/general/overlay";

const Account = () => {
    return (
        <React.Fragment>
            <Navbar/>
            <div id={"account"}>
                <Overlay/>
                <Layout>
                    <div id={"main-view"}>
                        <MainViewContainer/>
                    </div>
                </Layout>

            </div>
        </React.Fragment>
    );
};

export default checkLoggedIn( Account );
