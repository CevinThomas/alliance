const getDb = require( "../database/index" ).getDb;
ObjectId = require( "mongodb" ).ObjectID;


class Space {

    challengers = [];
    taskChallenges = [];

    constructor( owner, name, description ) {
        this.owner = owner;
        this.name = name;
        this.description = description;
    }

    static validateUsersEmail( users ) {
        return users.map( ( user ) => {
            return user.trim();
        } );
    }

    static findSpacePerUser( userId ) {
        const db = getDb();
        return db.collection( process.env.SPACECOLLECTION ).find( { owner: ObjectId( userId ) } ).toArray().then( r => r );
    }

    static findSpacePerCreatedName( createdName ) {
        const db = getDb();
        return db.collection( process.env.SPACECOLLECTION ).findOne( { name: createdName } ).then( r => r );
    }

    static findSpacePerId( spaceId ) {
        const db = getDb();
        return db.collection( process.env.SPACECOLLECTION ).findOne( { _id: ObjectId( spaceId ) } );
    }

    static inviteUsersToSpace( spaceId, friends, callback ) {
        const db = getDb();
        friends.map( ( friend ) => {
            db.collection( process.env.USERSCOLLECTION ).updateOne( { email: friend.email }, { $push: { incomingSpaceInvites: spaceId } } ).then( r => callback( r ) ).catch( e => callback( e ) );
        } );
    }

    save() {
        const db = getDb();
        return db.collection( "spaces" ).insertOne( this );
    }

}

module.exports = Space;