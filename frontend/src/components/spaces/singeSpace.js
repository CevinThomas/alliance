import React from "react";
import Heading from "../textElements/heading";
import Paragraph from "../textElements/paragraph";
import Axios from "axios";
import {GET_USER_WITH_TASK_LOOKUP} from "../../constants/urls";
import {connect} from "react-redux";
import {userPopulatedWithTasks} from "../../redux/actions";

const SingleSpace = ( props ) => {


    const fetchUsersWithTasks = async () => {
        const response = await Axios( {
            method: "POST",
            url: GET_USER_WITH_TASK_LOOKUP,
            data: {
                userIds: props.space[0].challengers
            }
        } );
        props.dispatch( userPopulatedWithTasks( response.data ) );
    };

    if ( props.space.length !== 0 ) {
        fetchUsersWithTasks();
    }

    let spaceUI;
    if ( props.space.length !== 0 ) {
        spaceUI = props.space.map( ( space ) => {
            return space.members.map( ( member ) => {
                return (
                    <div key={member._id}>
                        <Heading title={member.name} type={"h3"}/>
                        <div>
                            <Paragraph title={"Tasks"}/>
                        </div>
                    </div>
                );
            } );
        } );
    }

    return (
        <div>
            {spaceUI}
        </div>
    );
};

export default connect()( SingleSpace );
