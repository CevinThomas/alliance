import React from "react";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className={"navbar"}>
            <li className={"link-item"}>
                <Link to={"/login"}>Login</Link>
            </li>
            <li className={"link-item"}>
                <Link to={"/registration"}>Registration</Link>
            </li>
        </div>
    );
};

export default Navbar;
