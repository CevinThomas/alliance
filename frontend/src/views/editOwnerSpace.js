import React from "react";
import Edit from "../containers/editOwnerSpace/edit";
import Navbar from "../components/nav/nav";
import checkLoggedIn from "../HOC/checkLoggedIn";


const EditOwnerSpace = () => {
    return (
        <React.Fragment>
            <Navbar dark/>
            <Edit/>
        </React.Fragment>
    );
};

export default checkLoggedIn( EditOwnerSpace );
