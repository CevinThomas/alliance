import React from "react";
import "./styles.css";
import Registration from "./views/registration";
import Login from "./views/login";
import {Route} from "react-router-dom";
import Logout from "./views/logout";

function App() {
    return (
        <React.Fragment>
            <Route path={"/registration"} component={Registration}/>
            <Route path={"/login"} component={Login}/>
            <Route path={"/logout"} component={Logout}/>
        </React.Fragment>
    );
}

export default App;
