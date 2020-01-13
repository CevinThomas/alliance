const getDb = require( "../database/index" ).getDb;
ObjectId = require( "mongodb" ).ObjectID;

const User = require( "./users" );

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

    static getSpaceInformationFromInvite = async spaceId => {
        const db = getDb();
        return await db.collection( process.env.SPACECOLLECTION ).find( { _id: { $in: spaceId } } ).project( {
            "name": 1,
            "description": 1
        } ).toArray();
    };

    static getUserObjectsFromIds = ( ids, callback ) => {
        let flattenedIds = ids.flat();
        const db = getDb();
        return db.collection( process.env.USERSCOLLECTION ).find( { _id: { $in: flattenedIds } } ).toArray().then( r => callback( r ) );
    };

    static findSpacePerUser( userId ) {
        const db = getDb();
        return db.collection( process.env.SPACECOLLECTION ).find( { owner: ObjectId( userId ) } ).toArray().then( r => r );
    }

    static getAllSpacesFromUser = async ( token ) => {
        const db = getDb();
        const spaces = await db.collection( process.env.USERSCOLLECTION ).findOne( { tokens: token }, { $fields: { spaces: 1 } } );
        return await db.collection( process.env.SPACECOLLECTION ).find( { _id: { $in: spaces.spaces } } ).toArray();
    };

    static getSpacesWithMembers = () => {
        const db = getDb();
        return db.collection( process.env.SPACECOLLECTION ).aggregate( [
            {
                $lookup: {
                    from: "users",
                    let: { challengers: "$challengers" },
                    pipeline: [
                        {
                            $match:
                                {
                                    $expr:
                                        { $in: [ "$_id", "$$challengers" ] },
                                }
                        },
                        {
                            $project: {
                                password: 0,
                                tokens: 0,
                                friends: 0,
                                incomingFriendRequest: 0,
                                incomingSpaceInvites: 0,
                                spaces: 0
                            }
                        }
                    ],
                    as: "members"
                }
            }
        ] ).toArray();
    };

    static getSingleSpaceWithLookup = ( spaceId ) => {
        const db = getDb();
        return db.collection( process.env.SPACECOLLECTION ).aggregate( [
            {
                $lookup: {
                    from: "users",
                    let: { challengers: "$challengers" },
                    pipeline: [
                        {
                            $match:
                                {
                                    $expr:
                                        { $in: [ "$_id", "$$challengers" ] },
                                }
                        },
                        {
                            $project: {
                                password: 0,
                                tokens: 0,
                                friends: 0,
                                incomingFriendRequest: 0,
                                incomingSpaceInvites: 0,
                                spaces: 0
                            }
                        }
                    ],
                    as: "members"
                }
            }
        ] ).toArray();
    };

    static getUserIdsFromSpace = async ( spaceObjects ) => {
        let userIds = [];

        return new Promise( ( resolve, reject ) => {
            spaceObjects.map( ( space ) => {
                userIds.push( space.challengers );
            } );
            Space.convertIdsToObjectIds( userIds, ( ids ) => {
                resolve( ids );
            } );
        } );
    };


    static getUsersFromSpace = async ( token ) => {
        const db = getDb();
        const user = await db.collection( process.env.USERSCOLLECTION ).findOne( { tokens: token }, { $fields: { spaces: 1 } } );
        const spaces = await db.collection( process.env.SPACECOLLECTION ).find( { _id: { $in: user.spaces } } ).toArray();

        const userIds = await Space.getUserIdsFromSpace( spaces );
        return await User.getAllUsersFieldsFromDatabase( userIds );
    };

    //TODO: THIS IS THE CORRECT PROJECTION WAY
    static getSpacesFromUser = async ( token ) => {
        const db = getDb();
        const spaces = await db.collection( process.env.USERSCOLLECTION ).findOne( { tokens: token }, { fields: { spaces: 1 } } ).then( r => r ).catch( e => e );
        return await db.collection( process.env.SPACECOLLECTION ).find( { _id: { $in: spaces.spaces } } ).project( {
            "name": 1,
            "email": 1
        } ).toArray();
    };

    static checkIfUserIsOwnerOfSpace = async ( userId, callback ) => {
        let ownerOfTheseSpaces = [];
        const db = getDb();
        const ownerIds = await db.collection( process.env.SPACECOLLECTION ).find( { owner: userId } ).toArray().then( r => r ).catch( e => e );
        ownerIds.map( ( id ) => {
            ownerOfTheseSpaces.push( id._id );
        } );
        return callback( ownerOfTheseSpaces );
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
        db.collection( process.env.SPACECOLLECTION ).findOne( { name: createdName } ).then( r => callback( r ) );
    }

    static findSpacePerId( spaceId ) {
        const db = getDb();
        return db.collection( process.env.SPACECOLLECTION ).findOne( { _id: ObjectId( spaceId ) } ).then( r => r ).catch( e => e );
    }

    //TODO: Not optimal, check other solution for $in
    static inviteUsersToSpace = async ( spaceId, friends, callback ) => {
        const db = getDb();
        db.collection( process.env.USERSCOLLECTION ).updateMany( { email: { $in: friends } }, { $push: { incomingSpaceInvites: spaceId } } ).then( r => callback( r ) ).catch( e => callback( e ) );
    };

    static isUserInSpace = ( spaceId, userId ) => {
        const db = getDb();
        return db.collection( process.env.SPACECOLLECTION ).findOne( { challengers: userId } );
    };

    static addSpaceToCreator = ( userId, spaceId, callback ) => {
        const db = getDb();
        db.collection( process.env.SPACECOLLECTION ).updateOne( { _id: ObjectId( spaceId ) }, { $push: { challengers: ObjectId( userId ) } } );
        db.collection( process.env.USERSCOLLECTION ).updateOne( { _id: ObjectId( userId ) }, { $push: { spaces: ObjectId( spaceId ) } } ).then( r => callback( r ) ).catch( e => callback( e ) );
    };

    static updateSpaceCredentials = ( updatedValues, spaceId ) => {
        const db = getDb();
        return db.collection( process.env.SPACECOLLECTION ).updateOne( { _id: ObjectId( spaceId ) }, {
            $set: {
                name: updatedValues.name,
                description: updatedValues.description
            }
        } );
    };

    static leaveSpace = ( spaceId, userId ) => {
        const db = getDb();
        return Promise.all( [
            db.collection( process.env.SPACECOLLECTION ).updateOne( { _id: ObjectId( spaceId ) }, { $pull: { challengers: ObjectId( userId ) } } ),
            db.collection( process.env.USERSCOLLECTION ).updateOne( { _id: ObjectId( userId ) }, { $pull: { spaces: ObjectId( spaceId ) } } )
        ] );
    };

    static convertIdsToObjectIds = ( ids, callback ) => {
        let flattenedIds = ids.flat();
        let idsAsObjectIds = [];
        flattenedIds.map( ( id ) => {
            let idConverted = ObjectId( id );
            idsAsObjectIds.push( idConverted );
        } );
        callback( idsAsObjectIds );
    };

    static removeUsersFromSpace = ( usersId, spaceId ) => {
        const db = getDb();
        return db.collection( process.env.SPACECOLLECTION ).updateOne( { _id: ObjectId( spaceId ) }, { $pull: { challengers: { $in: usersId } } } );
    };

    static removeSpaceFromUser = ( usersId, spaceId ) => {
        const db = getDb();
        return db.collection( process.env.USERSCOLLECTION ).updateMany( { _id: { $in: usersId } }, { $pull: { spaces: ObjectId( spaceId ) } } );
    };

    static deleteSpace = ( spaceId, owner ) => {
        const db = getDb();
        db.collection( process.env.USERSCOLLECTION ).updateOne( { _id: ObjectId( owner ) }, { $pull: { spaces: ObjectId( spaceId ) } } );
        return db.collection( process.env.SPACECOLLECTION ).deleteOne( { _id: ObjectId( spaceId ) } ).then( r => r ).catch( e => e );
    };

    static removeTasksWhenDeletingSpace = ( taskIds ) => {
        const db = getDb();
        db.collection( process.env.CHALLENGECOLLECTION ).find( { _id: { $in: taskIds } } ).toArray().then( r => console.log( r ) );
        db.collection( process.env.USERSCOLLECTION ).updateMany( { tasks: { $in: taskIds } }, { $pull: { tasks: { $in: taskIds } } } );
        return db.collection( process.env.CHALLENGECOLLECTION ).deleteMany( { _id: { $in: taskIds } } );
    };

    static saveAndCheck = ( instance ) => {
        const db = getDb();
        return db.collection( process.env.SPACECOLLECTION ).insertOne( instance ).then( r => r ).catch( e => e );
    };

    save() {
        const db = getDb();
        return db.collection( "spaces" ).insertOne( this );
    }

}

module.exports = Space;