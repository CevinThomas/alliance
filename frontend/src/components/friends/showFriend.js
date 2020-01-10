import React from "react";
import {connect} from "react-redux";
import Heading from "../textElements/heading";
import Button from "../general/button";
import {withRouter} from "react-router";


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
        </div>
    );
};

export default connect( mapStateToProps )( withRouter( ShowFriend ) );
