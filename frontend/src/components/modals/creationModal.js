import React from "react";

const CreationModal = ( props ) => {
    return (
        <div className={"creation-modal"}>
            <div className={"inside-modal"}>
                <h2>{props.title}</h2>
            </div>
        </div>
    );
};

export default CreationModal;
