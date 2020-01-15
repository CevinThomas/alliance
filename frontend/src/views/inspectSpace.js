import React from "react";
import EditOrViewSpace from "../components/space/editOrViewSpace";
import Navbar from "../components/nav/nav";

const InspectSpace = () => {
    return (
        <React.Fragment>
            <Navbar dark/>
            <div>
                <EditOrViewSpace/>
            </div>
        </React.Fragment>
    );
};

export default InspectSpace;
