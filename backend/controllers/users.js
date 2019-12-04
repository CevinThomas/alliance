const User = require( "../models/users" );
const bcrypt = require( "bcrypt" );
const jwt = require( "jsonwebtoken" );

exports.addUser = async ( req, res, next ) => {
    const email = req.body.email;

    const user = await User.findUserByEmail( email );

    if ( user !== null ) {
        res.status( 200 ).send( "This email already exists" );
    } else {
        const token = jwt.sign( { email }, process.env.JWTSECRET );

        bcrypt.hash( req.body.password, 10, function ( err, hash ) {
            const user = new User( req.body.name, email, hash );
            user.saveUser();
            user.addTokenToUser( token );
        } );


        res.status( 200 ).send( "User succesfully created" );
    }
};

exports.login = async ( req, res, next ) => {
    const email = req.body.email;
    const user = await User.findUserByEmail( email );

    if ( user === null ) {
        res.status( 200 ).send( "We could not find a user with these credentials" );
    } else {
        bcrypt.compare( req.body.password, user.password, ( err, response ) => {
            if ( err ) {
                throw err;
            }

            if ( user.tokens.length !== 0 ) {
                res.status( 200 ).send( "You are already logged in" );
            } else {
                const token = jwt.sign( { email }, process.env.JWTSECRET );
                user.addTokenToUser( token );
                res.status( 200 ).send( "You are now logged in" );
            }
        } );
    }

};