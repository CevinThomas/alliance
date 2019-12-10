import React from "react";
import "./styles.css";
import Registration from "./Views/registration";
import {Route} from "react-router-dom";

function App() {
    return (
        <Route path={"/registration"} component={Registration}/>
    );
}

export default App;
