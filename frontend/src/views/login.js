import React from "react";
import LoginBox from "../containers/login/loginBox";
import Navbar from "../components/nav/nav";
import checkLoggedIn from "../HOC/checkLoggedIn";


const Login = () => {
    return (
        <React.Fragment>
            <Navbar/>
            <div id={"login"}>
                <LoginBox id={"login-box"}/>
            </div>
        </React.Fragment>
    );
};

export default checkLoggedIn( Login );
