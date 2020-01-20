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

    static getAllTasksFromUser = ( user ) => {
        const db = getDb();
        return db.collection( process.env.USERSCOLLECTION ).aggregate( [ { $match: { _id: ObjectId( user._id ) } },
            {
                $project: {
                    password: 0,
                    tokens: 0,
                    spaces: 0,
                    incomingSpaceInvites: 0,
                    incomingFriendRequest: 0,
                    friends: 0
                }
            },
            {
                $lookup: {
                    from: "challenges",
                    let: { tasks: "$tasks" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: [ "$_id", "$$tasks" ]
                                }
                            }
                        }
                    ],
                    as: "populatedTasks"
                }
            }
        ] ).toArray();
    };

    static addToSpaceAndUser = ( taskId, userId, spaceId ) => {
        const db = getDb();
        db.collection( process.env.USERSCOLLECTION ).updateOne( { _id: ObjectId( userId ) }, { $push: { tasks: ObjectId( taskId ) } } );
        db.collection( process.env.SPACECOLLECTION ).updateOne( { _id: ObjectId( spaceId ) }, {
            $push: {
                tasks: ObjectId( taskId )
            }
        } );
    };

    static findTaskById = ( id, callback ) => {
        const db = getDb();
        db.collection( process.env.CHALLENGECOLLECTION ).findOne( { _id: id } ).then( r => callback( r ) ).catch( e => callback( e ) );
    };

    save = ( callback ) => {
        const db = getDb();
        db.collection( process.env.CHALLENGECOLLECTION ).insertOne( this ).then( r => callback( r ) ).catch( e => callback( e ) );
    };

}

module.exports = Challenge;