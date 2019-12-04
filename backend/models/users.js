const client = require( "../database/index" );
const getDb = require( "../database/index" ).getDb;

class User {

    tokens = [];

    constructor( name, email, password ) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static findUserInDatabase = ( method, searchParam, callback ) => {
        const db = getDb();
        if ( method === "email" ) {
            db.collection( process.env.USERSCOLLECTION ).findOne( { email: searchParam } ).then( r => callback( r ) ).catch( e => callback( e ) );
        } else {
            db.collection( process.env.USERSCOLLECTION ).findOne( { tokens: searchParam } ).then( r => callback( r ) ).catch( e => callback( e ) );
        }
    };

    static findUserByToken( token ) {
        const db = getDb();
        return db.collection( process.env.USERSCOLLECTION ).findOne( { tokens: token } ).then( r => r ).catch( e => e );
    }

    static findUserByEmail( email ) {
        const db = getDb();
        return db.collection( process.env.USERSCOLLECTION ).findOne( { email } ).then( r => r ).catch( e => e );
    }

    static removeTokenFromUser( email ) {
        const db = getDb();
        db.collection( process.env.USERSCOLLECTION ).updateOne( { email }, { $set: { tokens: [] } } ).then().catch();
    }

    addTokenToUser( token ) {
        const db = getDb();
        db.collection( process.env.USERSCOLLECTION ).updateOne( { email: this.email }, { $push: { tokens: token } } ).then().catch( e => console.log( e ) );
    }

    saveUser() {
        const db = getDb();
        db.collection( process.env.USERSCOLLECTION ).insertOne( this ).then().catch( e => console.log( e ) );
    };


}

module.exports = User;