import React from "react";
import GoToSpaces from "../containers/homePage/goToSpaces";
import Navbar from "../components/nav/nav";

const HomePage = () => {
    return (
        <React.Fragment>
            <Navbar dark/>
            <div>
                <GoToSpaces/>
            </div>
        </React.Fragment>
    );
};

export default HomePage;
