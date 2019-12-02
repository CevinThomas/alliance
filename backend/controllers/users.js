const User = require( "../models/users" );

exports.addUser = ( req, res, next ) => {
    User.saveUser();
};