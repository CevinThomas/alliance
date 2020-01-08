import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import OverlayTransition from "../general/overlay-transition";

const SideMenuBar = ( props ) => {

    const links = Object.entries( props.links ).map( ( link ) => {
        return (
            <div key={link[1].path} className={"side-menu-link-container"}>
                <OverlayTransition/>
                <Link to={link[1].path}>{link[1].text}</Link>
            </div>
        );
    } );

    return (
        <React.Fragment>
            {links}
        </React.Fragment>
    );
};

SideMenuBar.propTypes = {
    links: PropTypes.object.isRequired
};

export default SideMenuBar;
