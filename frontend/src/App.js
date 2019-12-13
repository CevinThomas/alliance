import React from "react";
import "./styles.css";
import Registration from "./views/registration";
import Login from "./views/login";
import {Route, Switch} from "react-router-dom";
import Logout from "./views/logout";
import Account from "./views/account";
import Admin from "./views/admin";
import CreateSpace from "./views/createSpace";
import ManageChallengers from "./views/manageChallengers";

function App() {
    return (
        //TODO: Look into Switch, also exact path. Also if page not found, show login component or a 404 component.
        <React.Fragment>
            <Switch>
                <Route path={"/registration"} component={Registration}/>
                <Route path={"/login"} component={Login}/>
                <Route path={"/logout"} component={Logout}/>
                <Route path={"/account"} component={Account}/>
                <Route path={"/admin/create-space"} component={CreateSpace}/>
                <Route path={"/admin/manage-challengers"} component={ManageChallengers}/>
                <Route path={"/admin"} component={Admin}/>
            </Switch>
        </React.Fragment>
    );
}

export default App;
