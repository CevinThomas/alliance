import React from "react";
import {connect} from "react-redux";
import * as taskConstants from "../../constants/tasks";

const mapStateToProps = state => {
    return { typesOfTasks: state.typesOfTasks };
};

const ChooseChallenge = ( props ) => {

    const handleTaskTypeClicked = ( e ) => {
        props.dispatch( { type: taskConstants.CHOSEN_TASK_TYPE, payload: e.target.dataset.taskType } );
    };

    let tasksUI;
    if ( props.typesOfTasks.length !== 0 ) {
        tasksUI = props.typesOfTasks.map( ( type ) => {
            return (
                <div onClick={handleTaskTypeClicked} data-task-type={type} key={type} id={type} className={"task-type"}>
                    <h2>{type}</h2>
                </div>
            );
        } );
    } else {
        tasksUI = <div>There has been a massive error</div>;
    }

    return (
        <div className={"choose-task-ui"}>
            {tasksUI}
        </div>
    );
};

export default connect( mapStateToProps )( ChooseChallenge );
