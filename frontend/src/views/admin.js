import React from "react";
import Overlay from "../components/general/overlay";
import BoxOne from "../containers/admin/boxOne";
import BoxTwo from "../containers/admin/boxTwo";
import BoxThree from "../containers/admin/boxThree";
import BoxFour from "../containers/admin/boxFour";
import SideMenu from "../containers/admin/sideMenu";

const Admin = () => {
    return (
        <div id={"admin"}>
            <Overlay/>
            <div id={"admin-sideMenu"}>
                <SideMenu/>
            </div>
            <div id={"admin-box-container"}>
                <BoxOne/>
                <BoxTwo/>
                <BoxThree/>
                <BoxFour/>
            </div>
        </div>
    );
};

export default Admin;
