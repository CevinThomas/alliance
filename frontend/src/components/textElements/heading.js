import React from "react";

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
        <div className={props.class}>
            {heading}
        </div>
    );
};

export default Heading;
