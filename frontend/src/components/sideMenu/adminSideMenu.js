import React from "react";
import {Link} from "react-router-dom";

const AdminSideMenu = () => {
    return (
        <div className={"link-container"}>
            <Link to={"/admin"}>Admin</Link>
        </div>
    );
};

export default AdminSideMenu;
