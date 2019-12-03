const client = require( "../database/index" );

class User {
    constructor( name, email, password ) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static isUserUnique( email ) {
        let unique = 2;
        return client.connect( () => {
            return client.db( "alliance" ).collection( "users" ).findOne( { email } ).then( ( user ) => {
                return user;
            } );
        } );
    }

    saveUser() {
        client.connect( () => {
            const db = client.db( "alliance" );
            db.collection( "users" ).insertOne( {
                name: this.name,
                email: this.email,
                password: this.password
            } ).then().catch( e => console.log( e ) );
        } );
    };


}

module.exports = User;