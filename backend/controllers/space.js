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
    User.findMultipleUsersInDatabase( "email", usersToAdd, ( users ) => {
        Space.addUsersToSpace( createdSpace._id, users, ( response ) => {
            //TODO: Some type of error checking
        } );
    } );
    res.status( 200 ).send( "Space created" );
};


exports.addUsersToSpace = async ( req, res, next ) => {
    const token = getToken( req );
    const usersToAdd = Space.validateUsersEmail( req.body.membersToInvite );
    User.findMultipleUsersInDatabase( "email", usersToAdd, ( users ) => {
        Space.addUsersToSpace( req.body.spaceID, users, ( response ) => {

        } );
    } );
    if ( !token ) {
        res.status( 200 ).send( "Please login first" );
    } else {
        res.status( 200 ).send( "Adding users" );
    }
};