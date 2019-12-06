const getDb = require( "../database/index" ).getDb;

class User {

    tokens = [];

    constructor( name, email, password ) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    //If you change this, make sure to change the test for it as well
    static validateInput = ( name, email, password, callback ) => {
        let errorObject = {};


        if ( name.trim().length <= 0 ) {
            errorObject = { validated: false, errorMessage: "Fields cannot be empty" };
            return callback( errorObject );
        }

        if ( email.length <= 0 || password.length <= 0 ) {
            return errorObject = { validated: false, errorMessage: "Fields cannot be empty" };
        } else if ( password.length <= 6 ) {
            errorObject = { validated: false, errorMessage: "Password must be longer than 6 characters" };
            return callback( errorObject );
        } else {
            errorObject = { validated: true };
            return callback( errorObject );
        }
    };

    static findMultipleUsersInDatabase = ( method, searchParam, callback ) => {
        const db = getDb();
        searchParam.map( ( email ) => {
            db.collection( process.env.USERSCOLLECTION ).findOne( { email } ).then( r => callback( r ) ).catch( e => callback( e ) );
        } );
    };

    static findUserInDatabase = ( method, searchParam, callback ) => {
        const db = getDb();
        if ( method === "email" ) {
            db.collection( process.env.USERSCOLLECTION ).findOne( { email: searchParam.trim() } ).then( r => callback( r ) ).catch( e => callback( e ) );
        } else {
            db.collection( process.env.USERSCOLLECTION ).findOne( { tokens: searchParam.trim() } ).then( r => callback( r ) ).catch( e => callback( e ) );
        }
    };

    static editUsersToken = ( options, callback ) => {
        const db = getDb();
        if ( options.method === "add" ) {
            db.collection( process.env.USERSCOLLECTION ).updateOne( { email: options.email }, { $push: { tokens: options.token } } ).then( r => callback( r ) ).catch( e => callback( e ) );
        } else {
            db.collection( process.env.USERSCOLLECTION ).updateOne( { tokens: options.token }, { $set: { tokens: [] } } ).then( r => callback( r ) ).catch( e => callback( e ) );
        }
    };

    saveUser() {
        const db = getDb();
        db.collection( process.env.USERSCOLLECTION ).insertOne( this ).then().catch( e => console.log( e ) );
    };


}

module.exports = User;