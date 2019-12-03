const User = require( "../models/users" );
const bcrypt = require( "bcrypt" );

exports.addUser = async ( req, res, next ) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const unique = await User.isUserUnique( email );
    console.log( unique );

    bcrypt.hash( password, 10, function ( err, hash ) {
        const user = new User( name, email, hash );
        //user.saveUser();
    } );


    res.send( req.body );
};