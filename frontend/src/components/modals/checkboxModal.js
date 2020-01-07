import React, {useState} from "react";
import Input from "../forms/input";
import Heading from "../textElements/heading";
import Overlay from "../general/overlay";
import Button from "../general/button";
import {connect} from "react-redux";

const CheckboxModal = ( props ) => {

    const [ itemData, setItemData ] = useState( { name: "", description: "" } );

    const handleInputChange = ( e ) => {
        if ( e.target.name === "checkbox-name" ) {
            setItemData( {
                ...itemData,
                name: e.target.value
            } );
        }
        if ( e.target.name === "checkbox-description" ) {
            setItemData( {
                ...itemData,
                description: e.target.value
            } );
        }
    };

    const handleCreateItem = () => {

    };

    return (
        <div className={"creation-container"}>
            <Overlay/>
            <div className={"creation-modal"}>
                <div className={"inside-modal"}>
                    <div className={"left-column"}>
                        <div className={"left-column-container"}>
                            <Heading type={props.leftType} title={props.leftTitle}/>
                        </div>
                    </div>
                    <div className={"right-column"}>
                        <Heading class={"right-heading"} type={props.rightType} title={props.rightTitle}/>
                        <div className={"right-column-form"}>
                            <Input onchange={handleInputChange} type={"text"} placeholder={"Name of Checkbox"}
                                   name={"checkbox-name"}/>
                            <Input onchange={handleInputChange} type={"text"} placeholder={"Description of Checkbox"}
                                   name={"checkbox-description"}/>
                            <Button onclick={handleCreateItem} title={"Create item"}/>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default connect()( CheckboxModal );
