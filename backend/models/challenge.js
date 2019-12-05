const getDb = require( "../database/index" ).getDb;
const User = require( "../models/users" );

class Challenge {

    membersToInvite = [];

    constructor( name, type, host, description, goal ) {
        this.name = name;
        this.type = type;
        this.host = host;
        this.description = description;
        this.goal = goal;
    }

    //TODO: Validate so that member is an email
    addMembersToChallenge( members ) {
        members.map( ( member ) => {
            this.membersToInvite.push( member );
        } );
    }
}

module.exports = Challenge;