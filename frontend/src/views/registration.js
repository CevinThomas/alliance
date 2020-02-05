import React from "react";
import LeftColumn from "../containers/registration/leftColumn";
import RightColumn from "../containers/registration/rightColumn";
import Navbar from "../components/nav/nav";


const Registration = () => {
    return (
        <React.Fragment>
            <Navbar/>

            <div id={"registration"}>
                <div id={"registration-box"}>
                    <LeftColumn id={"left-column"}/>
                    <RightColumn id={"right-column"}/>
                </div>
            </div>

        </React.Fragment>
    );
};

export default Registration;
