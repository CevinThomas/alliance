import React from "react";
import {connect} from "react-redux";
import Heading from "../textElements/heading";

const mapStateToProps = state => {
    return { friend: state.viewFriend };
};

const ShowFriend = ( props ) => {
    return (
        <div id={props.id}>
            <Heading id={"main-heading"} title={"Friend " + props.friend.name} type={"h1"}/>
        </div>
    );
};

export default connect( mapStateToProps )( ShowFriend );
