const Space = require( "../models/space" );
const getToken = require( "../helperFunctions/index" ).getToken;
const User = require( "../models/users" );

exports.createSpace = async ( req, res, next ) => {
    //TODO: Make sure the space is unique, Unique name
    const requestUser = req.user;
    const spaceName = req.body.name;

    const usersToAdd = Space.validateUsersEmail( req.body.friendsToInvite );

    const space = new Space( requestUser._id, req.body.name, req.body.desc );
    const didSave = await Space.saveAndCheck( space );

    if ( didSave.result.ok === 1 ) {
        Space.findSpacePerCreatedName( spaceName, ( createdSpace ) => {
            //TODO: Add the createSpace.name and the createSpace.owner/host also
            User.spaceFindUsers( usersToAdd, ( friends ) => {
                Space.inviteUsersToSpace( createdSpace._id, usersToAdd, ( response ) => {
                    Space.addSpaceToCreator( requestUser._id, createdSpace._id, () => {

                    } );
                    //TODO: Some type of error checking
                } );
            } );
        } );
    }
    res.status( 200 ).send( "Space created" );
};

exports.getSpaceWithLookup = async ( req, res, next ) => {
    if ( req.body.spaceId.length !== 24 ) return res.status( 200 ).send( "Invalid Space ID" );

    const space = await Space.getSingleSpaceWithLookup( req.body.spaceId );

    res.status( 200 ).send( space );
};

exports.getUserWithTaskLookup = async ( req, res, next ) => {
    if ( typeof req.body.userIds === "string" ) {
        if ( req.body.userIds.length !== 24 ) return res.status( 200 ).send( "Invalid User ID" );
        const user = await Space.getSingleUserWithTasks( req.body.userIds );
        res.status( 200 ).send( user );
    } else {
        Space.convertIdsToObjectIds( req.body.userIds, ( ids ) => {
            Space.getUsersWithTasks( ids ).then( ( users ) => {
                res.status( 200 ).send( users );
            } );
        } );
    }


};

exports.getSingleSpace = async ( req, res, next ) => {
    const isMember = await Space.isUserInSpace( req.body.spaceId, req.user._id );
    if ( isMember !== null ) {
        if ( req.body.spaceId.length !== 24 ) {
            res.status( 200 ).send( { message: "Wrong amount of characters" } );
        } else {
            const space = await Space.findSpacePerId( req.body.spaceId );
            if ( space === null ) {
                res.status( 200 ).send( { message: "Could not find space" } );
            } else {
                User.findMultipleUsersInDatabase( space.challengers, ( users ) => {
                    res.status( 200 ).send( { space, users } );
                } );
            }
        }
    } else {
        res.status( 200 ).send( { message: "Not a part of this one" } );
    }

};

exports.updateSpaceCredentials = async ( req, res, next ) => {
    res.status( 200 ).send();
    await Space.updateSpaceCredentials( req.body.updatedText, req.body.spaceId );
    Space.convertIdsToObjectIds( req.body.removeMembers, ( convertedIds ) => {
        Space.removeUsersFromSpace( convertedIds, req.body.spaceId );
        Space.removeSpaceFromUser( convertedIds, req.body.spaceId );
        const removed = Space.removeSpacesFromTasks( req.body.spaceId, convertedIds );
        res.status( 200 ).send( { updated: true } );
    } );
};

exports.deleteSpace = async ( req, res, next ) => {
    const space = await Space.findSpacePerId( req.body.spaceId );

    Space.convertIdsToObjectIds( space.tasks, ( convertedIds ) => {
        const tasksRemoved = Space.removeTasksWhenDeletingSpace( convertedIds );
        tasksRemoved.then( r => r );
        Space.removeSpaceFromUser( space.challengers, req.body.spaceId );
        Space.removeUsersFromSpace( space.challengers, req.body.spaceId );
        Space.deleteSpace( req.body.spaceId, space.owner );
        res.status( 200 ).send();
    } );
};

exports.leaveSpace = async ( req, res, next ) => {
    await Space.removeSpaceFromTasks( req.body.spaceId, req.user._id );
    const didLeave = await Space.leaveSpace( req.body.spaceId, req.user._id );
    res.status( 200 ).send();
};

exports.getAllSpaces = async ( req, res, next ) => {
    const spaces = await Space.getSpacesWithMembers();
    res.status( 200 ).send( spaces );
};

//TODO: Error checking
//TODO: RENAME to getSpaceNameAndIdFromUser
exports.getSpacesFromUser = async ( req, res, next ) => {
    const token = getToken( req );
    const spaces = await Space.getSpacesFromUser( token );
    await Space.checkIfUserIsOwnerOfSpace( req.user._id, ( ownerIds ) => {

        res.status( 200 ).send( { allSpaces: spaces, ownerOf: ownerIds } );
    } );

};

exports.acceptSpaceInvite = async ( req, res, next ) => {
    if ( req.body.accept === true ) {

        const space = await Space.findSpacePerId( req.body.id );
        User.findUserInDatabase( "email", req.user.email, ( user ) => {
            Space.acceptSpaceInvite( space, user );
            res.status( 200 ).send( req.body );
        } );
    } else {
        const space = await Space.findSpacePerId( req.body.id );
        User.findUserInDatabase( "email", req.user.email, ( user ) => {
            const decline = Space.declinedSpaceInvite( user.id, space.id );
            res.status( 200 ).send();
        } );
    }
};


exports.addUsersToSpace = async ( req, res, next ) => {
    const token = getToken( req );
    const usersToAdd = Space.validateUsersEmail( req.body.membersToInvite );
    User.findMultipleUsersInDatabase( "email", usersToAdd, ( users ) => {
        Space.inviteUsersToSpace( req.body.spaceID, users, ( response ) => {

        } );
    } );

    return !token ? res.status( 200 ).send( "Please Login first" ) : res.status( 200 ).send( "Adding Users" );

};

exports.getSpaceInvites = async ( req, res, next ) => {
    const spaceInvites = await Space.getSpaceInformationFromInvite( req.user.incomingSpaceInvites );
    res.status( 200 ).send( spaceInvites );
};