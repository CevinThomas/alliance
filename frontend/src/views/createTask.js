import React from "react";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return { typesOfTasks: state.typesOfTasks };
};

const CreateTask = ( props ) => {

    console.log( props );
    return (
        <div>
            <h1>Task</h1>
        </div>
    );
};

export default connect( mapStateToProps )( CreateTask );
