import React, {useEffect} from "react";
import Overlay from "../general/overlay";
import Heading from "../textElements/heading";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

const ThankYouModal = ( props ) => {
    console.log( props );

    useEffect( () => {
        setTimeout( () => {
            props.history.push( "/admin" );

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
