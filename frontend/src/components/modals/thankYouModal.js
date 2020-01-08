import React, {useEffect} from "react";
import Overlay from "../general/overlay";
import Heading from "../textElements/heading";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as taskConstants from "../../constants/tasks";

const ThankYouModal = ( props ) => {

    useEffect( () => {
        setTimeout( () => {
            props.history.push( "/admin" );
            props.dispatch( { type: taskConstants.RESET_TASK_CREATION } );
        }, 1500 );
    }, [] );

    return (
        <div className={"creation-container"}>
            <Overlay/>
            <div className={"creation-modal"}>
                <div className={"inside-modal"}>
                    <Heading title={props.title} type={"h2"}/>

                </div>
            </div>
        </div>
    );
};

export default withRouter( connect()( ThankYouModal ) );
