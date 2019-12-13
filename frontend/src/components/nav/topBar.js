import React from "react";
import {Link} from "react-router-dom";

const TopBar = ( props ) => {

    const UI = Object.entries( props.links ).map( ( link ) => {
        return (
            <div className={"top-bar-link-container"} key={link[0]}>
                <Link to={link[1].to}>{link[1].title}</Link>
            </div>
        );
    } );

    return (
        <div id={props.id} className={"top-bar"}>
            {UI}
        </div>
    );
};

export default TopBar;
