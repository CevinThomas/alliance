import React from "react";
import Input from "../../components/forms/input";
import Select from "../../components/forms/select";
import Heading from "../../components/textElements/heading";
import Paragraph from "../../components/textElements/paragraph";
import AddCheckbox from "../../components/icons/addCheckbox";
import ChangeInformation from "../../components/icons/changeInformation";
import ViewInfo from "../../components/icons/viewInfo";
import {connect} from "react-redux";
import CheckboxModal from "../../components/modals/checkboxModal";
import * as taskConstants from "../../constants/tasks";
import Button from "../../components/general/button";

const mapStateToProps = state => {
    return {
        chosenTask: state.chosenTaskType,
        showCheckModal: state.showCheckModal,
        checkListItems: state.checklistItems
    };
};

const FinalFormStep = ( props ) => {

        const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        const maxDays = {
            January: { days: 31 },
            February: { days: 28 },
            March: { days: 31 },
            April: { days: 30 },
            May: { days: 31 },
            June: { days: 30 },
            July: { days: 31 },
            August: { days: 31 },
            September: { days: 30 },
            October: { days: 31 },
            November: { days: 30 },
            December: { days: 31 }
        };
        const date = new Date();
        const year = date.getFullYear();
        let currentAndFiveYearsAhead = [];

        for ( let i = year; i < year + 5; i++ ) {
            currentAndFiveYearsAhead.push( i );
        }

        let formUI;
        //TODO: Remake these into the environment variables just like in redux for easier maintenance
        //TODO: Instead of having a single Select component for months, days and years. Make one component that holds each, move state and logic to this container
        if ( props.chosenTask === "Checklist" ) {

            formUI = (
                <div>
                    <Input type={"text"} placeholder={"Name of Challenge"}/>
                    <Input type={"text"} placeholder={"Description of Challenge"}/>
                    <div>
                        <Select months={months} maxDays={maxDays} years={currentAndFiveYearsAhead}/>
                    </div>
                </div>
            );
        } else if ( props.chosenTask === "Single" ) {

        } else if ( props.chosenTask === "Big" ) {

        } else {

        }

        const handleStartOverClick = () => {
            props.dispatch( { type: taskConstants.RESET_TASK_CREATION } );
        };

        const showSpecificModal = ( e ) => {
            if ( e.target.id === "checkbox" ) {
                props.dispatch( { type: taskConstants.SHOW_CHECKBOX_MODAL, payload: true } );
            }
            if ( e.target.id === "change" ) {
                props.dispatch( { type: taskConstants.SHOW_CHANGE_MODAL, payload: true } );
            }
            if ( e.target.id === "view" ) {
                props.dispatch( { type: taskConstants.SHOW_VIEW_MODAL, payload: true } );
            }
        };

        let checkListUI;
        if ( props.checkListItems.length !== 0 ) {
            checkListUI = props.checkListItems.map( ( item ) => {
                return (
                    <div>
                        <Heading title={item.name} type={"h3"}/>
                        <Paragraph title={item.description}/>
                    </div>
                );
            } );
        }

        let mainUI = (
            <div className={"final-form"} id={"checkbox-form"}>
                <Button onclick={handleStartOverClick} id={"start-over"} title={"Start over"}/>
                <div className={"left-column"}>
                    <div>
                        <Heading title={"Create your task"} type={"h2"}/>
                        <Paragraph title={"And get instant access to our Resources!"}/>
                    </div>
                    <div className={"circle-container"}>
                        <AddCheckbox id={"checkbox"} onclick={showSpecificModal} type={"h4"} title={"Add Checkbox"}/>
                        <ChangeInformation id={"change"} onclick={showSpecificModal} type={"h4"}
                                           title={"Change task information"}/>
                        <ViewInfo id={"view"} onclick={showSpecificModal} type={"h4"} title={"View info"}/>
                    </div>
                </div>
                <div className={"right-column"}>
                    <div id={"first-right-container"} className={"right-container"}>
                        <Heading class={"task-form-heading"} title={"Final Form Step"} type={"h2"}/>
                        <div className={"task-form"}>
                            <Heading class={"task-form-heading"}
                                     title={"You have chosen " + props.chosenTask} type={"h2"}/>
                            {formUI}
                        </div>
                    </div>
                    <div className={"right-container"}>
                        {checkListUI}
                    </div>
                </div>


            </div>
        );

        let modalUI;
        if ( props.showCheckModal === true ) {
            modalUI = <CheckboxModal leftType={"h2"} leftTitle={"Top Side"} rightType={"h2"} rightTitle={"Bottom Side"}/>;
        }


        return (
            <React.Fragment>
                {modalUI}
                {mainUI}
            </React.Fragment>
        );

    }
;

export default connect( mapStateToProps )( FinalFormStep );
