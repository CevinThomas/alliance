import React from "react";

const ResponseMessage = ( props ) => {
    return (
        <div className={props.class}>
            <p>{props.errorMessage}</p>
        </div>
    );
};

export default ResponseMessage;