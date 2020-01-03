import React from "react";
import Input from "../forms/input";
import Heading from "../textElements/heading";

const CheckboxModal = ( props ) => {
    return (
        <div className={"creation-modal"}>
            <div className={"inside-modal"}>
                <div className={"left-column"}>
                    <div className={"left-column-container"}>
                        <Heading type={props.leftType} title={props.leftTitle}/>
                    </div>
                </div>
                <div className={"right-column"}>
                    <div>
                        <Heading type={props.rightType} title={props.rightTitle}/>
                    </div>
                    <div>
                        <Input type={"text"} placeholder={"Name of Checkbox"} name={"checkbox-name"}/>
                        <Input type={"text"} placeholder={"Description of Checkbox"} name={"checkbox-description"}/>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CheckboxModal;
