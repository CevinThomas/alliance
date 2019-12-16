const getDb = require( "../database/index" ).getDb;

class User {

    //TODO: Write one function to get stuff dynamically from DB

    tokens = [];
    friends = [];
    incomingFriendRequest = [];

    constructor( name, email, password ) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    //If you change this, make sure to change the test for it as well
    static validateInput = ( options, callback ) => {
        let errorObject = {};

        if ( options.name ) {
            if ( options.name.trim().length <= 0 ) {
                errorObject = { validated: false, errorMessage: "Fields cannot be empty" };
                return callback( errorObject );
            }
        }

        if ( options.email.length <= 0 || options.password.length <= 0 ) {
            errorObject = { validated: false, errorMessage: "Fields cannot be empty" };
            return callback( errorObject );
        } else if ( options.password.length <= 6 ) {
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

    static findFriendRequests = ( email, callback ) => {
        const db = getDb();
        db.collection( process.env.USERSCOLLECTION ).findOne( { email }, {
            name: 0,
            password: 0
        } ).then( r => callback( r ) ).catch( e => callback( e ) );
    };

    static addFriends = ( userEmail, friend ) => {
        //TODO: Check if the user already has sent an invite to the requested friend.
        const db = getDb();
        return db.collection( process.env.USERSCOLLECTION ).updateOne( { email: friend }, { $push: { incomingFriendRequest: userEmail } } ).then( r => r ).catch( e => e );
    };

    static acceptOrDeclineFriend = ( userEmail, friendEmail, accept ) => {
        const db = getDb();
        let bulk = db.collection( process.env.USERSCOLLECTION ).initializeUnorderedBulkOp();
        if ( accept ) {
            bulk.find( { email: userEmail } ).update( { $pull: { incomingFriendRequest: { $in: [ friendEmail ] } } } );
            bulk.find( { email: userEmail } ).update( { $push: { friends: friendEmail } } );
            bulk.find( { email: friendEmail } ).update( { $push: { friends: userEmail } } );
            bulk.execute();
        } else {
            db.collection( process.env.USERSCOLLECTION ).updateOne( { email: userEmail }, { $pull: { incomingFriendRequest: { $in: [ friendEmail ] } } } );
        }

    };

    static getCurrentFriends = ( email ) => {
        const db = getDb();
        return db.collection( process.env.USERSCOLLECTION ).findOne( { email }, { email: 1 } ).then( r => r ).catch( e => console.log( e ) );
    };

    saveUser() {
        const db = getDb();
        db.collection( process.env.USERSCOLLECTION ).insertOne( this ).then().catch( e => console.log( e ) );
    };


}

module.exports = User;