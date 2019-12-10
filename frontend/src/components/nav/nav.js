import React from "react";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <Link to={"/registration"}>Registration</Link>
        </div>
    );
};

export default Navbar;
