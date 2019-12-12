import React from "react";
import SideMenuBar from "../../components/sideMenu/sideMenuBar";

const SideMenu = () => {

    const sideMenuLinks = {
        linkOne: {
            path: "/admin/faq",
            text: "FAQ"
        },
        linkTwo: {
            path: "/admin/guides",
            text: "Guides"
        }
    };

    return (
        <div className={"side-menu"} id={"admin-side-menu"}>
            <SideMenuBar links={sideMenuLinks}/>
        </div>
    );
};

export default SideMenu;
