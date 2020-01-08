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
                <div key={type}>
                    <div id={type} className={"task-type"}>
                        <h2 data-task-type={type} onClick={handleTaskTypeClicked}>{type}</h2>
                    </div>
                </div>

            );
        } );
    } else {
        tasksUI = <div>There has been a massive error</div>;
    }

    return (
        <div>
            <div>
                {tasksUI}
            </div>
        </div>
    );
};

export default connect( mapStateToProps )( ChooseChallenge );
