import React from "react";
import "./styles.css";
import Registration from "./views/registration";
import Login from "./views/login";
import {Route} from "react-router-dom";
import Logout from "./views/logout";
import Account from "./views/account";
import Admin from "./views/admin";

function App() {
    return (
        <React.Fragment>
            <Route path={"/registration"} component={Registration}/>
            <Route path={"/login"} component={Login}/>
            <Route path={"/logout"} component={Logout}/>
            <Route path={"/account"} component={Account}/>
            <Route path={"/admin"} component={Admin}/>
        </React.Fragment>
    );
}

export default App;
