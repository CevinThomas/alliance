const getDb = require( "../database/index" ).getDb;
const User = require( "../models/users" );
ObjectId = require( "mongodb" ).ObjectID;


class Challenge {

    constructor( name, type, host, description, goal, chosenSpace, challengeData, endDate ) {
        this.name = name;
        this.type = type;
        this.host = host;
        this.description = description;
        this.goal = goal;
        this.chosenSpace = chosenSpace;
        this.challengeData = challengeData;
        this.startDate = Date.now();
        this.endDate = endDate;
        this.completed = false;

    }

    static addToSpaceAndUser = ( taskId, userId, spaceId ) => {
        const db = getDb();
        db.collection( process.env.USERSCOLLECTION ).updateOne( { _id: ObjectId( userId ) }, { $push: { tasks: ObjectId( taskId ) } } );
        db.collection( process.env.SPACECOLLECTION ).updateOne( { _id: ObjectId( spaceId ) }, {
            $push: {
                tasks: ObjectId( taskId )
            }
        } );
    };

    save = ( callback ) => {
        const db = getDb();
        db.collection( process.env.CHALLENGECOLLECTION ).insertOne( this ).then( r => callback( r ) ).catch( e => callback( e ) );
    };

}

module.exports = Challenge;