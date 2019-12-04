const client = require( "../database/index" );
const getDb = require( "../database/index" ).getDb;

class User {

    tokens = [];

    constructor( name, email, password ) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static isUserUnique( email ) {
        const db = getDb();
        return db.collection( "users" ).findOne( { email } ).then( r => r ).catch( e => e );
    }

    addTokenToUser( token ) {
        const db = getDb();
        db.collection( "users" ).updateOne( { email: this.email }, { $push: { tokens: token } } ).then().catch( e => console.log( e ) );
    }

    static removeTokenFromUser( email ) {
        const db = getDb();
        db.collection( "users" ).updateOne( { email }, { $set: { tokens: [] } } ).then().catch();
    }

    saveUser() {
        const db = getDb();
        db.collection( "users" ).insertOne( this ).then().catch( e => console.log( e ) );
    };


}

module.exports = User;