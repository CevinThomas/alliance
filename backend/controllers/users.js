const User = require( "../models/users" );
const bcrypt = require( "bcrypt" );
const jwt = require( "jsonwebtoken" );

exports.addUser = async ( req, res, next ) => {
    const email = req.body.email;

    try {
        User.validateInput( { name: req.body.name, email: email, password: req.body.password }, ( validated ) => {
            if ( validated.validated === false ) {
                res.status( 200 ).send( validated.errorMessage );
            } else {
                User.findUserInDatabase( "email", req.body.email, ( user ) => {
                    if ( user === null ) {
                        const token = jwt.sign( { email }, process.env.JWTSECRET );

                        bcrypt.hash( req.body.password, 10, function ( err, hash ) {
                            const user = new User( req.body.name, email, hash );
                            user.saveUser();
                            User.editUsersToken( { method: "add", email: user.email, token: token }, ( user ) => {
                                res.status( 200 ).send( "User successfully created" );
                            } );
                        } );
                    } else {
                        res.status( 200 ).send( "This email already exists" );
                    }
                } );
            }
        } );
    } catch {
        res.status( 500 ).send();
    }

};

exports.login = async ( req, res, next ) => {
    try {
        User.validateInput( { email: req.body.email, password: req.body.password }, ( validated ) => {
            if ( validated.validated !== false ) {
                const email = req.body.email;
                User.findUserInDatabase( "email", email, ( user ) => {
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
                                User.editUsersToken( { method: "add", email: email, token: token }, ( user ) => {
                                    res.status( 200 ).send( "You are now logged in" );
                                } );
                            }
                        } );
                    }
                } );
            } else {
                res.status( 200 ).send( validated.errorMessage );
            }
        } );
    } catch {
        res.status( 500 ).send();
    }
};

exports.logout = async ( req, res, next ) => {
    try {
        if ( req.headers["authorization"] ) {
            const token = req.headers["authorization"].split( "Bearer " )[1];
            User.findUserInDatabase( "tokens", token, ( user ) => {
                if ( user !== null ) {
                    User.editUsersToken( { method: "remove", token: token }, ( user ) => {
                        res.status( 200 ).send( "You have been logged out" );
                    } );
                } else {
                    res.status( 200 ).send( "You are not logged in" );
                }

            } );
        } else {
            res.status( 200 ).send( "You are not logged in" );
        }
    } catch {
        res.status( 500 ).send();
    }

};

exports.sandbox = async ( req, res, next ) => {
    User.findUserInDatabase( "email", req.body.email, ( user ) => {
        console.log( user );
    } );
    res.status( 200 ).send( "Sandbox" );
};