import React from "react";

const Layout = ( props ) => {
    return (
        <div className={"main-container"}>
            {props.children}
        </div>
    );
};

export default Layout;
