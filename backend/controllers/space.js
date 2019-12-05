const Space = require( "../models/space" );
const getToken = require( "../helperFunctions/index" ).getToken;
const User = require( "../models/users" );

exports.createSpace = async ( req, res, next ) => {
    try {
        const user = req.user;

        const space = new Space( user._id, req.body.name, req.body.description );
        const saved = await space.save();

        res.status( 200 ).send( "Space created" );
    } catch {
        res.status( 500 ).send( "Could not create space" );
    }
};


exports.addUsersToSpace = async ( req, res, next ) => {
    const token = getToken( req );
    const usersToAdd = Space.validateUsersEmail( req.body.membersToInvite );
    User.findMultipleUsersInDatabase( "email", usersToAdd, ( users ) => {
        Space.addUsersToSpace( req.body.spaceID, users, ( response ) => {

        } );
    } );
    if ( token === false ) {
        res.status( 200 ).send( "Please login first" );
    } else {
        res.status( 200 ).send( "Adding users" );
    }
};