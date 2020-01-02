const Space = require( "../models/space" );
const getToken = require( "../helperFunctions/index" ).getToken;
const User = require( "../models/users" );

exports.createSpace = async ( req, res, next ) => {
    //TODO: Make sure the space is unique, Unique name
    const requestUser = req.user;
    const spaceName = req.body.name;

    const usersToAdd = Space.validateUsersEmail( req.body.friendsToInvite );

    const space = new Space( requestUser._id, req.body.name, req.body.desc );
    space.save();

    const createdSpace = await Space.findSpacePerCreatedName( spaceName );

    //TODO: Add the createSpace.name and the createSpace.owner/host also
    await User.spaceFindUsers( usersToAdd, ( friends ) => {
        Space.inviteUsersToSpace( createdSpace._id, friends, ( response ) => {
            //TODO: Some type of error checking
        } );
    } );

    res.status( 200 ).send( "Space created" );
};

//TODO: Error checking
exports.getSpacesFromUser = async ( req, res, next ) => {
    const token = getToken( req );
    const spaces = await Space.getSpacesFromUser( token );
    res.status( 200 ).send( spaces );
};

exports.acceptSpaceInvite = async ( req, res, next ) => {
    if ( req.body.accept === true ) {

        const space = await Space.findSpacePerId( req.body.id );
        User.findUserInDatabase( "email", req.user.email, ( user ) => {
            Space.acceptSpaceInvite( space, user );
        } );
    } else {

    }

    res.status( 200 ).send( req.body );
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