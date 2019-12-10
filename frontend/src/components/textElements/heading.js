import React from "react";
import PropTypes from "prop-types";

const Heading = ( props ) => {

    let heading;
    switch ( props.type ) {
        case "h2":
            heading = <h2 data-test={"component-heading"}>{props.title}</h2>;
            break;
        case "h3":
            heading = <h3 data-test={"component-heading"}>{props.title}</h3>;
            break;
        case "h4":
            heading = <h4 data-test={"component-heading"}>{props.title}</h4>;
            break;
        case "h5":
            heading = <h5 data-test={"component-heading"}>{props.title}</h5>;
            break;
        default:
            heading = <h1 data-test={"component-heading"}>{props.title}</h1>;
    }

    return (
        <div data-test={"component-heading-container"} className={props.class}>
            {heading}
        </div>
    );
};

Heading.propTypes = {
    title: PropTypes.string.isRequired,
    class: PropTypes.string
};

export default Heading;
