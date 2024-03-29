const User = require( "../models/users" );
const bcrypt = require( "bcrypt" );
const jwt = require( "jsonwebtoken" );
const getToken = require( "../helperFunctions/index" );

exports.addUser = async ( req, res, next ) => {
    const email = req.body.email;

    try {
        User.validateInput( { name: req.body.name, email: email, password: req.body.password }, ( validated ) => {
            if ( validated.validated === false ) {
                res.status( 200 ).send( { message: validated.errorMessage } );
            } else {
                User.findUserInDatabase( "email", req.body.email, ( user ) => {
                    if ( user === null ) {
                        const token = jwt.sign( { email }, process.env.JWTSECRET );

                        bcrypt.hash( req.body.password, 10, function ( err, hash ) {
                            const user = new User( req.body.name, email, hash );
                            user.saveUser();
                            User.editUsersToken( { method: "add", email: user.email, token: token }, ( user ) => {
                                res.status( 200 ).send( { message: "User was successfully created!", token: token } );
                            } );
                        } );
                    } else {
                        console.log( "hello" );
                        res.status( 200 ).send( { message: "This email already exists" } );
                    }
                } );
            }
        } );
    } catch {
        res.status( 500 ).send();
    }

};

exports.login = async ( req, res, next ) => {
    User.validateInput( { email: req.body.email, password: req.body.password }, ( validated ) => {
        if ( validated.validated !== false ) {
            const email = req.body.email;
            User.findUserInDatabase( "email", email, ( user ) => {
                if ( user === null ) {
                    res.status( 200 ).send( { message: "We could not find a user with these credentials" } );
                } else {
                    bcrypt.compare( req.body.password, user.password, ( err, response ) => {
                        if ( err ) {
                            throw err;
                        }

                        if ( response !== false ) {
                            if ( user.tokens.length !== 0 ) {
                                res.status( 200 ).send( { message: "You are already logged in" } );
                            } else {
                                const token = jwt.sign( { email }, process.env.JWTSECRET );
                                User.editUsersToken( {
                                    method: "add",
                                    email: req.body.email,
                                    token: token
                                }, ( user ) => {
                                    res.status( 200 ).send( { message: "You are now logged in", token: token } );
                                } );
                            }
                        } else {
                            res.status( 200 ).send( { message: "We could not find a user with these credentials" } );
                        }


                    } );
                }
            } );
        } else {
            res.status( 200 ).send( { message: validated.errorMessage } );
        }
    } );

};

exports.logout = async ( req, res, next ) => {
    //TODO: Refactor auth with new helper function
    if ( req.headers["authorization"] ) {
        if ( req.headers["authorization"] !== null ) {
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
    } else {
        res.status( 200 ).send( "You are not logged in" );
    }
}
;

//TODO: Make this route good
exports.getInformation = async ( req, res, next ) => {
    const token = getToken.getToken( req );
    User.findUserInDatabase( "token", token, ( user ) => {
        res.status( 200 ).send( user );
    } );
};

exports.sandbox = async ( req, res, next ) => {
    User.findUserInDatabase( "email", req.body.email, ( user ) => {
        console.log( user );
    } );
    res.status( 200 ).send( "Sandbox" );
};