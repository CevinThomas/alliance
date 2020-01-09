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

exports.getSingleSpace = async ( req, res, next ) => {
    if ( req.body.spaceId.length !== 24 ) {
        res.status( 200 ).send( { message: "Wrong amount of characters" } );
    } else {
        const space = await Space.findSpacePerId( req.body.spaceId );
        User.findMultipleUsersInDatabase( space.challengers, ( users ) => {
            res.status( 200 ).send( { space, users } );
        } );

    }

};

exports.updateSpaceCredentials = async ( req, res, next ) => {
    await Space.updateSpaceCredentials( req.body.updatedText, req.body.spaceId );
    Space.convertIdsToObjectIds( req.body.removeMembers, ( convertedIds ) => {
        const removedUsers = Space.removeUsersFromSpace( convertedIds, req.body.spaceId );
        const removedSpaceFromUser = Space.removeSpaceFromUser( convertedIds, req.body.spaceId );
        res.status( 200 ).send( { updated: true } );
    } );


};

//TODO: Error checking
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
        res.status( 500 ).send( req.body );
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