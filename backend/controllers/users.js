const User = require( "../models/users" );
const bcrypt = require( "bcrypt" );
const jwt = require( "jsonwebtoken" );

exports.addUser = async ( req, res, next ) => {
    const email = req.body.email;

    if ( User.findUserByEmail( email ) !== null ) {
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
    const password = req.body.password;
};