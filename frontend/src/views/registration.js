import React from "react";
import LeftColumn from "../containers/registration/leftColumn";
import RightColumn from "../containers/registration/rightColumn";


const Registration = () => {
    return (
        <div id={"registration"}>
            <div id={"registration-box"}>
                <LeftColumn id={"left-column"}/>
                <RightColumn id={"right-column"}/>
            </div>
        </div>
    );
};

export default Registration;
