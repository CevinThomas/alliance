import React, {useEffect} from "react";
import Axios from "axios";
import {GET_USER_WITH_TASK_LOOKUP} from "../../constants/urls";
import {connect} from "react-redux";
import {userPopulatedWithTasks} from "../../redux/actions";
import Heading from "../textElements/heading";
import Paragraph from "../textElements/paragraph";
import {Link, withRouter} from "react-router-dom";

const mapStateToProps = state => {
    return {
        usersWithPopulatedTasks: state.usersWithPopulatedTasks,
        selectedSpace: state.selectedSpace
    };
};

const SingleSpace = ( props ) => {


    const fetchUsersWithTasks = async () => {
        const response = await Axios( {
            method: "POST",
            url: GET_USER_WITH_TASK_LOOKUP,
            data: {
                userIds: props.space.challengers
            }
        } );
        props.dispatch( userPopulatedWithTasks( response.data ) );
    };

    useEffect( () => {
        if ( props.space.length !== 0 ) {
            fetchUsersWithTasks();
        }
    }, [ props.space ] );
    

    let spaceUI;
    spaceUI = props.usersWithPopulatedTasks.map( ( user ) => (
        <Link to={props.history.location.pathname + props.history.location.search + "&&userId?=" + user._id}>
            <div key={user._id}>
                <Heading title={user.name} type={"h3"}/>
                <Paragraph title={"Tasks"}/>
                {user.populatedTasks.map( ( task ) => {
                    if ( task.chosenSpace === props.selectedSpace._id ) return < Paragraph key={task._id}
                                                                                           title={task.name}/>;
                } )}
            </div>
        </Link>
    ) );

    return (
        <div>
            {spaceUI}
        </div>
    );
};

export default connect( mapStateToProps, null )( withRouter( SingleSpace ) );
