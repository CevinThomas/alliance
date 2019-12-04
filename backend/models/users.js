const client = require( "../database/index" );

class User {

    tokens = [];

    constructor( name, email, password ) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static isUserUnique( email ) {
        this.findUserByEmail( this.test() );
    }

    static addTokenToUser( email, token ) {
        client.connect( () => {
            client.db( process.env.DATABASENAME ).collection( "users" ).updateOne( { email }, { $push: { tokens: token } } );
        } );
    }

    static removeTokenFromUser( email ) {
        client.connect( () => {
            client.db( process.env.DATABASENAME ).collection( "users" ).updateOne( { email }, { $set: { tokens: [] } } );
        } );
    }

    saveUser() {
        client.connect( () => {
            const db = client.db( process.env.DATABASENAME );
            db.collection( "users" ).insertOne( {
                name: this.name,
                email: this.email,
                password: this.password
            } ).then().catch( e => console.log( e ) );
        } );
    };


}

module.exports = User;