const User = require( "../models/users" );

//TODO: Exclude password and tokens from DB request (Hardcoded reset at the moment)
exports.getFriendInvites = async ( req, res, next ) => {
    User.findFriendRequests( req.user.email, ( user ) => {
        res.status( 200 ).send( user.incomingFriendRequest );

    } );
};

exports.addFriend = async ( req, res, next ) => {

    User.addFriends( req.user.email, req.body.friend );

    res.status( 200 ).send( "Friends added" );
};

exports.acceptFriend = async ( req, res, next ) => {

    //TODO: This should be filtered out in the mongoDB process, not here, remove fields not used.
    const friendEmail = req.body;
    User.findUserInDatabase( "email", friendEmail.email, ( friend ) => {
        friend.password = "";
        friend.tokens = "";
        friend.friends = "";
        friend.incomingFriendRequest = "";
        User.acceptOrDeclineFriend( req.user.email, friendEmail.email, friendEmail.accept, req.user, friend );
    } );

    res.status( 200 ).send( "Accepting friend" );
};

exports.getFriends = async ( req, res, next ) => {
    const user = await User.getCurrentFriends( req.user.email );
    console.log( user );

    res.status( 200 ).send( user.friends );
};