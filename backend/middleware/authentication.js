const User = require( "../models/users" );

const authenticateUser = ( req, res, next ) => {

    //TODO: Error handle findUserInDatabase, if no user received, send response back directly.
    if ( req.headers["authorization"] ) {
        const token = req.headers["authorization"].split( "Bearer" )[1];
        User.findUserInDatabase( "token", token, ( user ) => {
            req.user = user;
            next();
        } );
    } else {
        res.status( 200 ).send( "Please login first" );
    }
};

module.exports = authenticateUser;