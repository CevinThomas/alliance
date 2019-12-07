import React from "react";

const Heading = ( props ) => {

    let heading;
    switch ( props.type ) {
        case "h2":
            heading = <h2>{props.title}</h2>;
            break;
        case "h3":
            heading = <h3>{props.title}</h3>;
            break;
        case "h4":
            heading = <h4>{props.title}</h4>;
            break;
        case "h5":
            heading = <h5>{props.title}</h5>;
            break;
        default:
            heading = <h1>{props.title}</h1>;
    }

    return (
        <div className={props.class}>
            {heading}
        </div>
    );
};

export default Heading;
