import React, {useEffect} from "react";
import {GET_USER_WITH_TASK_LOOKUP} from "../../constants/urls";
import Axios from "axios";
import {connect} from "react-redux";
import {isLoading, singleUserPopulatedWithTasks} from "../../redux/actions";
import Heading from "../textElements/heading";
import Paragraph from "../textElements/paragraph";
import Loader from "../loader/loader";

const mapStateToProps = state => {
    return {
        singleUserWithPopulatedTasks: state.singleUserPopulatedWithTasks,
        loading: state.isLoading
    };
};

const SingleUserInSpace = ( props ) => {

    useEffect( () => {
        props.dispatch( isLoading( true ) );
        Axios( {
            method: "POST",
            url: GET_USER_WITH_TASK_LOOKUP,
            data: {
                userIds: props.userId
            }
        } ).then( ( r ) => {
            props.dispatch( singleUserPopulatedWithTasks( r.data ) );
            props.dispatch( isLoading( false ) );
        } ).catch( e => console.log( e ) );
    }, [] );

    let userUI;
    if ( props.singleUserWithPopulatedTasks === "Invalid User ID" ) {
        userUI = (
            <div>
                <Heading title={"Invalid User ID"} type={"h1"}/>
            </div>
        );
    } else {
        if ( props.singleUserWithPopulatedTasks.populatedTasks !== undefined ) {
            userUI = (
                <div>
                    <Heading title={props.singleUserWithPopulatedTasks.name} type={"h2"}/>
                    <div>
                        <Heading title={"Tasks"} type={"h3"}/>
                        {props.singleUserWithPopulatedTasks.populatedTasks.map( ( task ) => {
                            if ( task.chosenSpace === props.spaceId ) {
                                return (
                                    <div key={task._id}>
                                        <Heading title={task.name} type={"h3"}/>
                                        {task.challengeData.length !== 0 ? task.challengeData.map( ( challenge ) => {
                                            return (
                                                <div key={challenge._id}>
                                                    <Paragraph title={challenge.name}/>
                                                    <Paragraph title={challenge.description}/>
                                                    {challenge.completed ? <span>Completed</span> :
                                                        <span>Not Completed</span>}
                                                </div>
                                            );
                                        } ) : <Paragraph title={"This task does not have any challenges"}/>}
                                    </div>
                                );
                            }
                        } )}
                    </div>

                </div>
            );
        }
    }


    return (
        <div>
            {props.loading ? <Loader/> : null}
            {userUI}
        </div>
    );
};

export default connect( mapStateToProps, null )( SingleUserInSpace );
