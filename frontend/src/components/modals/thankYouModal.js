import React from "react";
import Overlay from "../general/overlay";
import Heading from "../textElements/heading";

const ThankYouModal = ( props ) => {

    return (
        <div className={"creation-container"}>
            <Overlay/>
            <div className={"creation-modal"}>
                <div className={"inside-modal"}>
                    <Heading title={"Thank you for creating this task!"} type={"h2"}/>

                </div>
            </div>
        </div>
    );
};

export default ThankYouModal;
