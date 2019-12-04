const User = require( "../models/users" );
const bcrypt = require( "bcrypt" );
const jwt = require( "jsonwebtoken" );

exports.addUser = async ( req, res, next ) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const unique = await User.isUserUnique( email );
    console.log( unique );

    if ( unique !== null ) {
        res.status( 200 ).send( "This email already exists" );
    } else {
        const token = jwt.sign( { name }, process.env.JWTSECRET );

        bcrypt.hash( password, 10, function ( err, hash ) {
            const user = new User( name, email, hash );
            User.addTokenToUser( email, token );
            user.saveUser();
        } );


        res.status( 200 ).send( "User succesfully created" );
    }
};

exports.login = async ( req, res, next ) => {
    res.send( "Loggin in user" );
};