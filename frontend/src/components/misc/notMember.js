import React from "react";
import {Link} from "react-router-dom";

const NotMember = ( props ) => {
    return (
        <div id={props.id}>
            <Link to={props.link}>{props.message}</Link>
        </div>

    );
};

export default NotMember;