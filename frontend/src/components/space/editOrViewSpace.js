import React, {useEffect, useState} from "react";
import queryString from "query-string";
import Heading from "../../components/textElements/heading";
import Axios from "axios";
import * as urlConstants from "../../constants/urls";
import {GET_CURRENT_FRIENDS, GET_USER_CHALLENGES, UPDATE_TASK} from "../../constants/urls";
import getToken from "../../helperMethods/getToken";
import Paragraph from "../../components/textElements/paragraph";
import {withRouter} from "react-router-dom";
import Input from "../forms/input";
import Button from "../general/button";
import {connect} from "react-redux";
import * as taskConstants from "../../constants/tasks";
import ThankYouModal from "../modals/thankYouModal";
import {currentFriends, isLoading} from "../../redux/actions";
import Loader from "../loader/loader";
import Overlay from "../general/overlay";
import InviteFriendsModal from "../modals/inviteFriendsModal";

const mapStateToProps = state => {
    return { showThankYouModal: state.showThankYouModal, loading: state.isLoading };
};

const EditOrViewSpace = ( props ) => {
    //TODO: REFRACTOR INTO CONTAINERS

    getToken();

    const [ selectedSpaceId, setSelectedSpaceId ] = useState( "" );
    const [ responseSpace, setResponseSpace ] = useState( null );
    const [ startDisplayingData, setStartDisplayingData ] = useState( false );
    const [ requestFailed, setRequestFailed ] = useState( false );
    const [ editData, setEditData ] = useState( { name: "", description: "" } );
    const [ membersToRemove, setMembersToRemove ] = useState( [] );
    const [ usersInSpace, setUsersInSpace ] = useState( [] );
    const [ tasksInSpace, setTasksInSpace ] = useState( "" );
    const [ selectedTaskId, setSelectedTaskId ] = useState( "" );
    const [ selectedTaskToEdit, setSelectedTaskToEdit ] = useState( "" );
    const [ selectedTaskChallengersData, setSelectedTaskChallengersData ] = useState( "" );
    const [ originalChallengeName, setOriginalChallengeName ] = useState( "" );
    const [ showUpdatedTaskModal, setShowUpdatedTaskModal ] = useState( false );
    const [ showInviteFriends, setShowInviteFriends ] = useState( false );


    useEffect( () => {
        const spaceId = queryString.parse( props.history.location.search );

        setSelectedSpaceId( spaceId.spaceId );
    }, [ props.history.location, selectedTaskId ] );

    useEffect( () => {
        if ( selectedSpaceId !== "" ) {
            props.dispatch( isLoading( true ) );
            Axios( {
                method: "POST",
                url: urlConstants.GET_SINGLE_SPACE,
                data: {
                    spaceId: selectedSpaceId.toString()
                }
            } ).then( ( response ) => {
                if ( response.data.message ) {
                    setRequestFailed( true );
                    props.dispatch( isLoading( false ) );
                } else {
                    setResponseSpace( response.data.space );
                    setEditData( {
                        name: response.data.space.name,
                        description: response.data.space.description
                    } );
                    setUsersInSpace( response.data.users );
                    setStartDisplayingData( true );
                    props.dispatch( isLoading( false ) );
                }
            } ).catch( e => setStartDisplayingData( true ) );
        }
    }, [ selectedSpaceId ] );


    useEffect( () => {
        Axios( {
            method: "GET",
            url: GET_USER_CHALLENGES
        } ).then( ( r ) => {
            console.log( r.data );
            setTasksInSpace( r.data );
        } ).catch( e => console.log( e ) );
    }, [] );

    const retrieveFriendsToDisplay = () => {
        Axios( {
            method: "GET",
            url: GET_CURRENT_FRIENDS,
        } ).then( ( r ) => {
            if ( r.data.length !== 0 ) {
                props.dispatch( currentFriends( r.data ) );
            }
            setShowInviteFriends( true );
        } ).catch( e => console.log( e ) );
    };

    const submitUpdatedChanges = () => {
        Axios( {
            method: "PUT",
            url: urlConstants.UPDATE_SPACE_CREDENTIALS,
            data: {
                removeMembers: membersToRemove,
                updatedText: editData,
                spaceId: responseSpace._id
            }
        } ).then( ( response ) => {
            if ( response.data.updated === true ) {
                props.dispatch( { type: taskConstants.SHOW_THANK_YOU_MODAL, payload: true } );
            }
        } ).catch( e => console.log( e ) );
    };

    const deleteSpaceHandler = () => {
        Axios( {
            method: "DELETE",
            url: urlConstants.DELETE_SPACE,
            data: {
                spaceId: responseSpace._id
            }
        } ).then( response => {
            props.history.push( "/admin/edit-space-challenges" );
        } ).catch( e => console.log( e ) );
    };

    const leaveSpaceHandler = () => {
        Axios( {
            method: "POST",
            url: urlConstants.LEAVE_SPACE,
            data: {
                spaceId: responseSpace._id
            }
        } ).then( r => {
            props.history.push( "/admin/edit-space-challenges" );
        } ).catch( e => console.log( e ) );
    };

    const handleInputChange = ( e ) => {
        setEditData( {
            ...editData,
            [e.target.name]: e.target.value
        } );
    };

    const determineButtonState = ( e ) => {
        if ( e.target.textContent === "Remove" ) {
            seeIfMemberIdIsAlreadyAdded( e );
        } else {
            cancelRemovingMember( e );
        }
    };

    const seeIfMemberIdIsAlreadyAdded = ( e ) => {
        if ( membersToRemove.includes( e.target.attributes[0].nodeValue ) ) return;
        else {
            removeMembersHandler( e.target.attributes[0].nodeValue );
        }
    };

    const removeMembersHandler = ( memberId ) => {
        let memberIdToRemove = [];
        memberIdToRemove.push( memberId );
        setMembersToRemove( membersToRemove.concat( memberIdToRemove ) );
    };

    const cancelRemovingMember = ( e ) => {
        const index = membersToRemove.indexOf( e.target.attributes[0].nodeValue );
        const freshMembersToRemove = [ ...membersToRemove ];
        freshMembersToRemove.splice( index, 1 );
        setMembersToRemove( freshMembersToRemove );
    };

    const handleEditTask = taskId => {
        const challengeToEdit = tasksInSpace.filter( ( task ) => task._id === taskId );
        let challengeWithoutArray = {};
        challengeToEdit.map( ( task ) => {
            challengeWithoutArray = task;
        } );
        let challengersData = {};
        challengeWithoutArray.challengeData.map( ( task ) => {
            challengersData = task;
            setOriginalChallengeName( task.name );
        } );
        setSelectedTaskChallengersData( challengersData );
        setSelectedTaskToEdit( challengeWithoutArray );
    };

    const handleTaskEditInput = ( { target } ) => {
        setSelectedTaskToEdit( {
            ...selectedTaskToEdit,
            [target.name]: target.value
        } );
    };

    const changeMainCheckedHandler = ( { target } ) => {
        setSelectedTaskToEdit( {
            ...selectedTaskToEdit,
            completed: target.checked
        } );
    };

    const updateChallengeHandler = ( toBeDeleted ) => {
        selectedTaskToEdit.challengeData.splice( 0, 1 );
        selectedTaskToEdit.challengeToEdit = selectedTaskChallengersData;
        Axios( {
            method: "PUT",
            url: UPDATE_TASK,
            data: {
                selectedTaskToEdit,
                toBeDeleted
            }
        } ).then( ( response ) => {
            setShowUpdatedTaskModal( true );
        } ).catch( e => console.log( e ) );
    };

    let viewUI;
    if ( props.showThankYouModal === true ) {
        return viewUI = <ThankYouModal title={"You have updated the space!"}/>;
    }

    if ( showUpdatedTaskModal === true ) {
        return viewUI = <ThankYouModal title={"You have updated the task!"}/>;
    }

    const closeSelectedTaskModalHandler = () => {
        setSelectedTaskToEdit( "" );
    };


    let editTaskUI = "";
    if ( selectedTaskToEdit !== "" && selectedTaskToEdit !== undefined ) {
        editTaskUI = (
            <div className={"selected-task-modal"}>
                <Overlay/>
                <div className={"selected-task-modal-inner"}>
                    <div onClick={closeSelectedTaskModalHandler} className={"close"}>Close</div>
                    <div className={"inner-modal"}>
                        <h2>Edit Challenge</h2>
                        <label htmlFor="name">Name</label>
                        <Input onchange={handleTaskEditInput} type="text" value={selectedTaskToEdit.name}
                               name={"name"}/>
                        <label htmlFor="name">Description</label>
                        <Input onchange={handleTaskEditInput} type="text" value={selectedTaskToEdit.description}
                               name={"description"}/>
                        <label htmlFor="name">Goal</label>
                        <Input onchange={handleTaskEditInput} type="text" value={selectedTaskToEdit.goal}
                               name={"goal"}/>
                        <input type={"checkbox"} value={selectedTaskToEdit.completed}
                               checked={selectedTaskToEdit.completed} onChange={changeMainCheckedHandler}/>
                        <button onClick={() => updateChallengeHandler( true )}>Delete Challenge</button>
                        <Button title={"Update Challenge"} onclick={updateChallengeHandler}/>
                    </div>
                </div>
            </div>
        );
    }


    let taskUI;
    if ( tasksInSpace.length !== 0 ) {
        taskUI = tasksInSpace.map( ( task ) => {
            return task.chosenSpace === selectedSpaceId ?
                <div className={"task-container"} key={task._id}>
                    <h3>Name: {task.name}</h3>
                    <p>Description: {task.description}</p>
                    <Paragraph title={"Completed: " + task.completed.toString()}/>

                    <div>
                        <Button title={"Edit task"} onclick={() => handleEditTask( task._id )}/>
                    </div>
                </div>
                : null;
        } );
    }

    if ( requestFailed !== true ) {
        if ( startDisplayingData === true ) {
            if ( responseSpace !== null ) {
                viewUI = (
                    <div id={"view-spaces"}>
                        <div className={"full-width-container"}>
                            <div className={"view-form main-container"}>
                                <Heading title={editData.name} type={"h2"}/>
                                {props.isOwner ? <Input type={"text"} name={"name"} onchange={handleInputChange}
                                                        value={editData.name}/> : null}
                                <Paragraph title={editData.description}/>
                                {props.isOwner ? <Input type={"text"} name={"description"} onchange={handleInputChange}
                                                        value={editData.description}/> : null}
                            </div>
                        </div>
                        <div className={"main-container"}>
                            <Heading title={"Members"} type={"h2"}/>
                            <button onClick={retrieveFriendsToDisplay}>Add Members</button>
                            {usersInSpace.length !== 0 ? usersInSpace.map( ( challenger ) => {
                                return (
                                    <div className={"challenger-container"} key={challenger.email}>
                                        <h4>Email: {challenger.email}</h4>
                                        {membersToRemove.includes( challenger._id ) ?
                                            <span>We will remove {challenger.email}</span> : null}
                                        {props.isOwner && challenger._id !== responseSpace.owner ?
                                            <Button data={challenger._id}
                                                    title={membersToRemove.includes( challenger._id ) ? "Cancel" : "Remove"}
                                                    onclick={determineButtonState}/> : null}
                                    </div>
                                );
                            } ) : null}
                        </div>
                        <div className={"main-buttons-container main-container"}>
                            {!props.isOwner ?
                                <Button title={"Leave Space"} type={"h3"} onclick={leaveSpaceHandler}/> : null}
                            {props.isOwner ?
                                <Button onclick={submitUpdatedChanges} title={"Update Space"} type={"h3"}/> : null}
                            {props.isOwner ?
                                <Button onclick={deleteSpaceHandler} title={"Delete Space"} type={"h3"}/> : null}
                        </div>
                    </div>
                );
            } else {
                viewUI = (
                    <div>
                        <Heading title={"Sorry, no space was found"} type={"h1"}/>
                    </div>
                );
            }
        }
    } else {
        return viewUI = (
            <div>
                <Heading title={"Sorry, the space id is incorrect"} type={"h1"}/>
            </div>
        );
    }

    return (
        <div id={"edit-space-singular"}>
            {props.loading ? <Loader/> : null}
            {showInviteFriends ? <InviteFriendsModal spaceId={selectedSpaceId}/> : null}
            {viewUI}
            <div className={"full-width-container"} id={"tasks-in-space"}>
                <div className={"main-container"}>
                    <Heading title={"Your tasks in this space"} type={"h2"}/>
                    {taskUI}
                </div>
            </div>
            <div className={"task-modal"}>
                {editTaskUI}
            </div>

        </div>
    );
};

export default withRouter( connect( mapStateToProps )( EditOrViewSpace ) );
