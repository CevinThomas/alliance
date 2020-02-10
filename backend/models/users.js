const getDb = require( "../database/index" ).getDb;

class User {

    //TODO: Write one function to get stuff dynamically from DB

    tokens = [];
    friends = [];
    spaces = [];
    incomingFriendRequest = [];
    incomingSpaceInvites = [];
    completedTasks = [];
    completedSecondaryTasks = [];

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

    static spaceFindUsers = async ( friendsEmailArray, callback ) => {
        const db = getDb();
        db.collection( process.env.USERSCOLLECTION ).find( {
            email: {
                $in: friendsEmailArray
            }
        } ).toArray().then( r => callback( r ) ).catch( e => callback( e ) );
    };

    static getAllUsersFieldsFromDatabase = ( ids ) => {
        const db = getDb();
        return db.collection( process.env.USERSCOLLECTION ).find( { _id: { $in: ids[0] } }, {
            projection: {
                name: 1,
                email: 1,
                spaces: 1
            }
        } ).toArray();
    };

    static findMultipleUsersInDatabase = ( searchParam, callback ) => {
        const db = getDb();
        db.collection( process.env.USERSCOLLECTION ).find( { _id: { $in: searchParam } } ).project( { "email": 1 } ).toArray().then( r => callback( r ) ).catch( e => callback( e ) );
    };

    static getUserInDatabase = ( userId ) => {
        const db = getDb();
        return db.collection( process.env.USERSCOLLECTION ).findOne( { _id: ObjectId( userId ) }, { projection: { name: 1 } } );
    };

    static getAllUsers = () => {
        const db = getDb();
        return db.collection( process.env.USERSCOLLECTION ).find( {}, {
            projection: {
                name: 1,
                email: 1,
                friends: 1,
                incomingFriendRequest: 1
            }
        } ).toArray();
    };

    static removeFriend = async ( friendId, userId ) => {
        const db = getDb();
        const bulk = db.collection( process.env.USERSCOLLECTION ).initializeUnorderedBulkOp();
        bulk.find( { _id: ObjectId( userId ) } ).updateOne( { $pull: { friends: ObjectId( friendId ) } } );
        bulk.find( { _id: ObjectId( friendId ) } ).updateOne( { $pull: { friends: ObjectId( userId ) } } );
        const response = await bulk.execute();
        db.collection( process.env.SPACECOLLECTION ).updateMany( { challengers: ObjectId( friendId ) }, { $pull: friendId } );
        return (response.result.ok === 1 && response.result.nModified === 2);
    };

    //TODO: PROJECTION SYNTAX FOR THE REST OF THE APPLICATION
    //TODO: REBUILD THIS LIKE ABOVE
    static findUserInDatabase = ( method, searchParam, callback ) => {
        const db = getDb();
        if ( method === "email" ) {
            db.collection( process.env.USERSCOLLECTION ).findOne( { email: searchParam.trim() }, { email: 0 } ).then( ( r ) => {
                callback( r );
            } ).catch( e => callback( e ) );
        } else {
            db.collection( process.env.USERSCOLLECTION ).findOne( { tokens: searchParam.trim() }, { email: 0 } ).then( ( r ) => {
                callback( r );
            } ).catch( e => callback( e ) );
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

    static addFriends = async ( userEmail, friend ) => {
        //TODO: Check if the user already has sent an invite to the requested friend.
        const db = getDb();
        //TODO: CHECK IF userEmail is in friends incomingFriendRequests
        const friendStats = await db.collection( process.env.USERSCOLLECTION ).findOne( { email: friend } );
        if ( friendStats.incomingFriendRequest.includes( userEmail ) ) return;
        return db.collection( process.env.USERSCOLLECTION ).updateOne( { email: friend }, { $push: { incomingFriendRequest: userEmail } } ).then( r => r ).catch( e => e );
    };

    //TODO: Check to see if the execution was completed, return value to conditionally send response to user
    static acceptOrDeclineFriend = ( userEmail, friendEmail, accept, userId, friendId ) => {
        const db = getDb();
        let bulk = db.collection( process.env.USERSCOLLECTION ).initializeUnorderedBulkOp();
        if ( accept ) {
            bulk.find( { email: userEmail } ).update( { $pull: { incomingFriendRequest: { $in: [ friendEmail ] } } } );
            bulk.find( { email: userEmail } ).update( { $push: { friends: friendId } } );
            bulk.find( { email: friendEmail } ).update( { $push: { friends: userId } } );
            bulk.execute();
        } else {
            db.collection( process.env.USERSCOLLECTION ).updateOne( { email: userEmail }, { $pull: { incomingFriendRequest: { $in: [ friendEmail ] } } } );
        }

    };

    //TODO: SO THIS WORKS (PROJECTION) (ONLY FIND)
    static getCurrentFriends = async ( email ) => {
        const db = getDb();
        const frientsId = await db.collection( process.env.USERSCOLLECTION ).findOne( { email }, { email: 1 } ).then( r => r ).catch( e => console.log( e ) );
        return await db.collection( process.env.USERSCOLLECTION ).find( { _id: { $in: frientsId.friends } } ).project( {
            "name": 1,
            "email": 1
        } ).toArray();
    };

    saveUser() {
        const db = getDb();
        db.collection( process.env.USERSCOLLECTION ).insertOne( this ).then().catch( e => console.log( e ) );
    };


}

module.exports = User;