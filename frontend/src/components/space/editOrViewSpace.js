import React, {useEffect, useState} from "react";
import queryString from "query-string";
import Heading from "../../components/textElements/heading";
import Axios from "axios";
import * as urlConstants from "../../constants/urls";
import getToken from "../../helperMethods/getToken";
import Paragraph from "../../components/textElements/paragraph";
import {withRouter} from "react-router-dom";
import Input from "../forms/input";
import Button from "../general/button";
import {connect} from "react-redux";
import * as taskConstants from "../../constants/tasks";
import ThankYouModal from "../modals/thankYouModal";

const mapStateToProps = state => {
    return { showThankYouModal: state.showThankYouModal };
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


    useEffect( () => {
        const spaceId = queryString.parse( props.history.location.search );
        setSelectedSpaceId( spaceId.spaceId );
    }, [] );

    useEffect( () => {
        if ( selectedSpaceId !== "" ) {
            Axios( {
                method: "POST",
                url: urlConstants.GET_SINGLE_SPACE,
                data: {
                    spaceId: selectedSpaceId.toString()
                }
            } ).then( ( response ) => {
                if ( response.data.message ) {
                    setRequestFailed( true );
                } else {
                    console.log( response.data.users );
                    setResponseSpace( response.data.space );
                    setEditData( {
                        name: response.data.space.name,
                        description: response.data.space.description
                    } );
                    setUsersInSpace( response.data.users );
                    setStartDisplayingData( true );
                }
            } ).catch( e => setStartDisplayingData( true ) );
        }
    }, [ selectedSpaceId ] );

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

    let viewUI;
    if ( props.showThankYouModal === true ) {
        return viewUI = <ThankYouModal title={"You have updated the space!"}/>;
    }

    if ( requestFailed !== true ) {
        if ( startDisplayingData === true ) {
            if ( responseSpace !== null ) {
                viewUI = (
                    <div id={"view-spaces"}>
                        <Heading title={editData.name} type={"h2"}/>
                        {props.isOwner ? <Input type={"text"} name={"name"} onchange={handleInputChange}
                                                value={editData.name}/> : null}
                        <Paragraph title={editData.description}/>
                        {props.isOwner ? <Input type={"text"} name={"description"} onchange={handleInputChange}
                                                value={editData.description}/> : null}
                        <div>
                            <Heading title={"Members"} type={"h3"}/>
                            {usersInSpace.length !== 0 ? usersInSpace.map( ( challenger ) => {
                                return (
                                    <div key={challenger.email}>
                                        <Heading title={challenger.email}
                                                 type={"h4"}/> {membersToRemove.includes( challenger._id ) ?
                                        <span>We will remove {challenger.email}</span> : null}
                                        {props.isOwner ? <Button data={challenger._id}
                                                                 title={membersToRemove.includes( challenger._id ) ? "Cancel" : "Remove"}
                                                                 onclick={determineButtonState}/> : null}
                                    </div>
                                );
                            } ) : null}
                        </div>
                        {!props.isOwner ?
                            <Button title={"Leave Space"} type={"h3"} onclick={leaveSpaceHandler}/> : null}
                        {props.isOwner ?
                            <Button onclick={submitUpdatedChanges} title={"Update Space"} type={"h3"}/> : null}
                        {props.isOwner ?
                            <Button onclick={deleteSpaceHandler} title={"Delete Space"} type={"h3"}/> : null}
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
        <div>
            {viewUI}
        </div>
    );
};

export default withRouter( connect( mapStateToProps )( EditOrViewSpace ) );
