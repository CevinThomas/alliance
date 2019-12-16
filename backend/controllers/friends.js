const User = require( "../models/users" );

//TODO: Exclude password and tokens from DB request (Hardcoded reset at the moment)
exports.getFriendInvites = async ( req, res, next ) => {
    User.findFriendRequests( req.user.email, ( user ) => {

        res.status( 200 ).send( user.invites );

    } );
};

exports.addFriend = async ( req, res, next ) => {
    console.log( req.user );


    req.body.friends.map( ( friend ) => {
        User.addFriends( req.user.email, friend );
    } );
    res.status( 200 ).send( "Friends added" );
};

exports.acceptFriend = async ( req, res, next ) => {

    const friendEmail = req.body;
    User.acceptOrDeclineFriend( req.user.email, friendEmail.email, friendEmail.accept );
    res.status( 200 ).send( "Accepting friend" );
};