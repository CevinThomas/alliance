import React, {useCallback, useEffect, useState} from "react";
import queryString from "query-string";
import Heading from "../../components/textElements/heading";
import Axios from "axios";
import * as urlConstants from "../../constants/urls";
import getToken from "../../helperMethods/getToken";
import Paragraph from "../../components/textElements/paragraph";
import {withRouter} from "react-router-dom";
import Input from "../forms/input";
import Button from "../general/button";


const EditOrViewSpace = ( props ) => {
    //TODO: REFRACTOR INTO CONTAINERS

    getToken();

    const [ selectedSpaceId, setSelectedSpaceId ] = useState( "" );
    const [ responseSpace, setResponseSpace ] = useState( null );
    const [ startDisplayingData, setStartDisplayingData ] = useState( false );
    const [ requestFailed, setRequestFailed ] = useState( false );
    const [ editData, setEditData ] = useState( { name: "", description: "" } );
    const [ membersToRemove, setMembersToRemove ] = useState( [] );

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
                    setResponseSpace( response.data );
                    setEditData( {
                        name: response.data.name,
                        description: response.data.description
                    } );
                    setStartDisplayingData( true );
                }
            } ).catch( e => setStartDisplayingData( true ) );
        }
    }, [ selectedSpaceId ] );

    const submitUpdatedChanges = useCallback( () => {
        Axios( {
            method: "PUT",
            url: urlConstants.UPDATE_SPACE_CREDENTIALS,
            data: {
                removeMembers: membersToRemove,
                updatedText: editData,
                spaceId: responseSpace._id
            }
        } ).then( r => console.log( r ) ).catch( e => console.log( e ) );
    } );

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
                            {responseSpace.challengers.map( ( challenger ) => {
                                return (
                                    <div key={challenger}>
                                        <Heading title={challenger}
                                                 type={"h4"}/> {membersToRemove.includes( challenger ) ?
                                        <span>We will remove {challenger}</span> : null}
                                        {props.isOwner ? <Button data={challenger}
                                                                 title={membersToRemove.includes( challenger ) ? "Cancel" : "Remove"}
                                                                 onclick={determineButtonState}/> : null}
                                    </div>
                                );
                            } )}
                        </div>
                        {props.isOwner ?
                            <Button onclick={submitUpdatedChanges} title={"Update Space"} type={"h3"}/> : null}
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

export default withRouter( EditOrViewSpace );
