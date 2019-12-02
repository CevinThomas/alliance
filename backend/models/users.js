const client = require( "../database/index" );

class User {
    constructor( name, email, age ) {
        this.name = name;
        this.email = email;
        this.age = age;
    }

    static saveUser() {
        console.log( "Saving User" );
    };


}

module.exports = User;