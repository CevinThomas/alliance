import React from "react";
import "./styles.css";
import Registration from "./views/registration";
import Login from "./views/login";
import {Route} from "react-router-dom";

function App() {
    return (
        <React.Fragment>
            <Route path={"/registration"} component={Registration}/>
            <Route path={"/login"} component={Login}/>
        </React.Fragment>
    );
}

export default App;
