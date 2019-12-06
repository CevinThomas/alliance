import React from "react";
import Heading from "../../Components/textElements/heading";

const RightColumn = ( props ) => {
    //TODO: Maybe remake this with a HOC so that the container div is not JSX inside of this container
    return (
        <div id={props.id}>
            <div id={"registration-inner"}>
                <div>
                    <Heading class={"registration-heading"} title={"Right Column"}/>
                    <Heading class={"registration-heading"} title={"We need some things from you"}/>
                </div>
            </div>
        </div>
    );
};

export default RightColumn;
