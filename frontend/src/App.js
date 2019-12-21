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
import Friend from "./containers/manageChallengers/friend";
import EditSpaceChallenges from "./views/edit-space-challenges";
import CreateTask from "./views/createTask";


function App() {
    return (
        //TODO: Look into Switch, also exact path. Also if page not found, show login component or a 404 component.
        <React.Fragment>
            <Switch>
                <Route path={"/registration"} component={Registration}/>
                <Route path={"/login"} component={Login}/>
                <Route path={"/logout"} component={Logout}/>
                <Route path={"/account"} component={Account}/>
                <Route exact path={"/admin/create-space"} component={CreateSpace}/>
                <Route exact path={"/admin/manage-challengers"} component={ManageChallengers}/>
                <Route exact path={"/admin"} component={Admin}/>
                <Route exact path={"/admin/edit-space-challenges"} component={EditSpaceChallenges}/>
                <Route exact path={"/admin/friend/:friend"} component={Friend}/>
                <Route exact path={"/admin/create-challenges"} component={CreateTask}/>
            </Switch>
        </React.Fragment>
    );
}

export default App;
