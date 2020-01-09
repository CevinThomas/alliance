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
        User.acceptOrDeclineFriend( req.user.email, friendEmail.email, friendEmail.accept, req.user._id, friend._id );
    } );

    res.status( 200 ).send( { message: "Added" } );
};

exports.getFriends = async ( req, res, next ) => {
    const friendsToRetrieve = await User.getCurrentFriends( req.user.email );
    res.status( 200 ).send( friendsToRetrieve );
};

exports.getFriend = async ( req, res, next ) => {
    const friend = await User.getUserInDatabase( req.body.friendId.id );
    if ( friend !== null ) {
        res.status( 200 ).send( friend );
    } else {
        res.status( 200 ).send( { message: "Did not find a friend with that ID" } );
    }

};