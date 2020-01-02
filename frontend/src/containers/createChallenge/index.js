import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const mapStateToProps = state => {
    return { typesOfTasks: state.typesOfTasks };
};

const ChooseChallenge = ( props ) => {

    let tasksUI;
    if ( props.typesOfTasks.length !== 0 ) {
        tasksUI = props.typesOfTasks.map( ( type ) => {
            return (

                <div key={type}>
                    <Link to={"/admin/create-challenges/" + type}>
                        <h2>{type}</h2>
                    </Link>
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
