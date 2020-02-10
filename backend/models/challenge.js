const getDb = require( "../database/index" ).getDb;
const User = require( "../models/users" );
ObjectId = require( "mongodb" ).ObjectID;


class Challenge {

    challengeData = [];

    constructor( name, type, host, description, goal, chosenSpace, endDate ) {
        this.name = name;
        this.type = type;
        this.host = host;
        this.description = description;
        this.goal = goal;
        this.chosenSpace = chosenSpace;
        this.startDate = Date.now();
        this.endDate = endDate;
        this.completed = false;

    }

    static addTaskToCompletedArray = async ( task, userId ) => {
        const db = getDb();

        task.challengeToEdit = "";

        const user = await db.collection( process.env.USERSCOLLECTION ).findOne( {
            _id: ObjectId( userId )
        } );

        const taskAlreadyInArray = user.completedTasks.map( ( userTask ) => {
            if ( userTask._id === task._id ) {
                return true;
            }
        } );

        if ( task.completed === true ) {
            if ( taskAlreadyInArray[0] === true ) {
                return;
            }

            return db.collection( process.env.USERSCOLLECTION ).updateOne( { _id: ObjectId( userId ) }, { $push: { completedTasks: task } } );
        } else {
            console.log( task._id );
            if ( taskAlreadyInArray[0] === true ) {
                return db.collection( process.env.USERSCOLLECTION ).updateOne( { _id: ObjectId( userId ) }, { $pull: { completedTasks: { _id: task._id } } } );
            }
        }
    };

    static addSecondaryTaskToCompletedArray = async ( task, userId ) => {
        const db = getDb();
        const user = await db.collection( process.env.USERSCOLLECTION ).findOne( {
            _id: ObjectId( userId )
        } );
        const taskAlreadyInArray = user.completedSecondaryTasks.map( ( userTask ) => {
            if ( userTask._id === task._id ) {
                return true;
            }

        } );

        if ( task.completed === true ) {
            if ( taskAlreadyInArray[0] === true ) {
                return;
            }

            return db.collection( process.env.USERSCOLLECTION ).updateOne( { _id: ObjectId( userId ) }, { $push: { completedSecondaryTasks: task } } );
        } else {
            if ( taskAlreadyInArray[0] === true ) {
                return db.collection( process.env.USERSCOLLECTION ).updateOne( { _id: ObjectId( userId ) }, { $pull: { completedSecondaryTasks: { _id: task._id } } } );
            }
        }
    };

    static updateTask = async ( task ) => {
        const db = getDb();
        return db.collection( process.env.CHALLENGECOLLECTION ).updateOne( { _id: ObjectId( task._id ) } ).update( {
            $set: {
                name: task.name,
                description: task.description,
                goal: task.goal,
                completed: task.completed
            }
        } );
    };

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

    static deleteTask = async ( task, userId ) => {
        const db = getDb();
        return Promise.all( [
            db.collection( process.env.USERSCOLLECTION ).updateOne( { _id: ObjectId( userId ) }, { $pull: { tasks: ObjectId( task._id ) } } ),
            db.collection( process.env.CHALLENGECOLLECTION ).deleteOne( { _id: ObjectId( task._id ) } ),
            db.collection( process.env.SPACECOLLECTION ).updateOne( { _id: ObjectId( task.chosenSpace ) }, { $pull: { tasks: ObjectId( task._id ) } } )
        ] );
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