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
import CreateChallenge from "./views/createTask";
import InspectSpace from "./views/inspectSpace";
import EditOwnerSpace from "./views/editOwnerSpace";
import ViewFriend from "./views/viewFriend";
import ViewSpaces from "./views/viewSpaces";
import HomePage from "./views/homePage";

import LogRocket from "logrocket";

LogRocket.init( "mumejg/valhalla" );

function App() {
    
    return (
        //TODO: Look into Switch, also exact path. Also if page not found, show login component or a 404 component.
        <React.Fragment>
            <Switch>
                <Route path={"/"} exact component={HomePage}/>
                <Route path={"/registration"} component={Registration}/>
                <Route path={"/login"} component={Login}/>
                <Route path={"/logout"} component={Logout}/>
                <Route path={"/account"} component={Account}/>
                <Route exact path={"/admin/create-space"} component={CreateSpace}/>
                <Route exact path={"/admin/manage-challengers"} component={ManageChallengers}/>
                <Route exact path={"/admin"} component={Admin}/>
                <Route exact path={"/admin/edit-space-challenges"} component={EditSpaceChallenges}/>
                <Route exact path={"/admin/friend/:friend"} component={Friend}/>
                <Route exact path={"/admin/create-challenges"} component={CreateChallenge}/>
                <Route path={"/admin/view-space/"} component={InspectSpace}/>
                <Route path={"/admin/edit-space/"} component={EditOwnerSpace}/>
                <Route path={"/admin/friend/"} component={ViewFriend}/>
                <Route path={"/spaces"} component={ViewSpaces}/>
            </Switch>
        </React.Fragment>
    );
}

export default App;
