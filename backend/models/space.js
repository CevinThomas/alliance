const getDb = require( "../database/index" ).getDb;
ObjectId = require( "mongodb" ).ObjectID;


class Space {

    challengers = [];
    tasks = [];

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

    //TODO: Maybe add so we can see who the owner is?
    static getSpaceInformationFromInvite = async spaceId => {
        console.log( spaceId );
        const db = getDb();
        return await db.collection( process.env.SPACECOLLECTION ).find( { _id: { $in: spaceId } } ).project( {
            "name": 1,
            "description": 1
        } ).toArray();
    };

    static findSpacePerUser( userId ) {
        const db = getDb();
        return db.collection( process.env.SPACECOLLECTION ).find( { owner: ObjectId( userId ) } ).toArray().then( r => r );
    }

    //TODO: THIS IS THE CORRECT PROJECTION WAY
    static getSpacesFromUser = async ( token ) => {
        const db = getDb();
        const spaces = await db.collection( process.env.USERSCOLLECTION ).findOne( { tokens: token }, { fields: { spaces: 1 } } ).then( r => r ).catch( e => e );
        return await db.collection( process.env.SPACECOLLECTION ).find( { _id: { $in: spaces.spaces } } ).project( { "name": 1 } ).toArray();
    };

    //TODO: Add if statement checking if accepted or declined just like in the users
    static acceptSpaceInvite = ( space, user ) => {
        const db = getDb();
        let bulk = db.collection( process.env.USERSCOLLECTION ).initializeUnorderedBulkOp();
        bulk.find( { email: user.email } ).update( { $push: { spaces: space._id } } );
        bulk.find( { email: user.email } ).update( { $pull: { incomingSpaceInvites: space._id } } );
        bulk.execute();
        db.collection( process.env.SPACECOLLECTION ).updateOne( { name: space.name }, { $push: { challengers: user._id } } );
    };

    static findSpacePerCreatedName( createdName, callback ) {
        const db = getDb();
        return db.collection( process.env.SPACECOLLECTION ).findOne( { name: createdName } ).then( r => callback( r ) );
    }

    static findSpacePerId( spaceId ) {
        const db = getDb();
        return db.collection( process.env.SPACECOLLECTION ).findOne( { _id: ObjectId( spaceId ) } );
    }

    //TODO: Not optimal, check other solution for $in
    static inviteUsersToSpace = async ( spaceName, friends, callback ) => {
        console.log( friends );
        const db = getDb();
        db.collection( process.env.USERSCOLLECTION ).updateMany( { email: { $in: friends } }, { $push: { incomingSpaceInvites: spaceName } } ).then( r => callback( r ) ).catch( e => callback( e ) );
    };

    static addSpaceToCreator = ( userId, spaceId, callback ) => {
        const db = getDb();
        db.collection( process.env.USERSCOLLECTION ).updateOne( { _id: ObjectId( userId ) }, { $push: { spaces: ObjectId( spaceId ) } } ).then( r => callback( r ) ).catch( e => callback( e ) );
    };

    save() {
        const db = getDb();
        return db.collection( "spaces" ).insertOne( this );
    }

}

module.exports = Space;