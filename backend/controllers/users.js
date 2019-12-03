const User = require( "../models/users" );
const bcrypt = require( "bcrypt" );
const jwt = require( "jsonwebtoken" );

exports.addUser = async ( req, res, next ) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const unique = await User.isUserUnique( email );
    const token = jwt.sign( { name }, process.env.JWTSECRET );
    console.log( token );

    bcrypt.hash( password, 10, function ( err, hash ) {
        const user = new User( name, email, hash );
        //user.saveUser();
    } );


    res.send( req.body );
};