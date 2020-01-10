import React from "react";
import {connect} from "react-redux";
import Heading from "../textElements/heading";
import Button from "../general/button";
import {withRouter} from "react-router";
import Paragraph from "../textElements/paragraph";


const mapStateToProps = state => {
    return { friend: state.viewFriend };
};

const ShowFriend = ( props ) => {

    const goBackButtonClickHandler = () => {
        props.history.goBack();
    };

    return (
        <div id={props.id}>
            <Button onclick={goBackButtonClickHandler} id={"friend-back"} title={"Go Back"}/>
            <Heading id={"main-heading"} title={"Friend " + props.friend.name} type={"h1"}/>
            <div id={"friend-information-container"}>
                <div id={"friend-inner-container"}>
                    <div id={"friend-information-left"}>
                        <div id={"friend-image"}></div>
                    </div>
                    <div id={"friend-information-right"}>
                        <div id={"friend-details"}>
                            <Heading title={"Friend header"} type={"h3"}/>
                            <Paragraph title={"Stockholm, Tyresö"}/>
                            <Paragraph title={"hhasuhdayhsdye hadsyayncyen"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect( mapStateToProps )( withRouter( ShowFriend ) );
