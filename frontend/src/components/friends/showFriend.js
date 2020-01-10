import React from "react";
import {connect} from "react-redux";
import Heading from "../textElements/heading";
import {withRouter} from "react-router";
import Paragraph from "../textElements/paragraph";
import GoBack from "../general/goBack";
import RemoveFriend from "./removeFriend";


const mapStateToProps = state => {
    return { friend: state.viewFriend };
};

const ShowFriend = ( props ) => {

    return (
        <div id={props.id}>
            <GoBack id={"friend-back"} title={"Go Back"}/>
            <Heading id={"main-heading"} title={"Friend " + props.friend.name} type={"h1"}/>
            <div id={"friend-information-container"}>
                <div id={"friend-inner-container"}>
                    <div id={"friend-information-left"}>
                        <div id={"friend-image"}></div>
                    </div>
                    <div id={"friend-information-right"}>
                        <div id={"friend-details"}>
                            <Heading title={props.friend.name} type={"h3"}/>
                            <Paragraph title={"Stockholm, Tyresö"}/>
                            <RemoveFriend type={"h3"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect( mapStateToProps )( withRouter( ShowFriend ) );
