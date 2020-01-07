import React, {useState} from "react";
import Input from "../forms/input";
import Heading from "../textElements/heading";
import Overlay from "../general/overlay";
import Button from "../general/button";
import {connect} from "react-redux";
import * as taskConstants from "../../constants/tasks";

const CheckboxModal = ( props ) => {

    const [ itemData, setItemData ] = useState( { name: "", description: "", completed: false } );

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
        props.dispatch( { type: taskConstants.CREATE_TASK_ITEM, payload: itemData } );
    };

    const handleCloseModal = () => {
        props.dispatch( { type: taskConstants.SHOW_CHECKBOX_MODAL, payload: false } );
    };

    return (
        <div className={"creation-container"}>
            <Overlay/>
            <div id={"checkbox-close"} onClick={handleCloseModal}>Close</div>
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
