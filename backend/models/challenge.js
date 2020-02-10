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

    static updateTask = async ( task, idToEdit ) => {
        const db = getDb();
        if ( task.completed === true ) {
            task.challengeToEdit.completed = true;
        }
        let bulk = db.collection( process.env.CHALLENGECOLLECTION ).initializeUnorderedBulkOp();
        bulk.find( { _id: ObjectId( task._id ) } ).update( {
            $set: {
                name: task.name,
                description: task.description,
                goal: task.goal,
                completed: task.completed
            }
        } );
        bulk.find( {
            _id: ObjectId( task._id ),
            "challengeData._id": ObjectId( task.challengeToEdit._id )
        }, ).update( {
            $set: {
                "challengeData.$.name": task.challengeToEdit.name,
                "challengeData.$.description": task.challengeToEdit.description,
                "challengeData.$.completed": task.challengeToEdit.completed
            }
        } );
        const executed = await bulk.execute();
        return executed;
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

    static findTaskById = ( id, callback ) => {
        const db = getDb();
        db.collection( process.env.CHALLENGECOLLECTION ).findOne( { _id: id } ).then( r => callback( r ) ).catch( e => callback( e ) );
    };

    static insertSecondaryTasks = ( secondaryTasks, createdChallengeId ) => {
        secondaryTasks.forEach( ( task ) => {
            task._id = new ObjectId();
        } );
        const db = getDb();
        db.collection( process.env.CHALLENGECOLLECTION ).update( { _id: createdChallengeId }, { $push: { challengeData: { $each: secondaryTasks } } } );
    };

    save = ( callback ) => {
        const db = getDb();
        db.collection( process.env.CHALLENGECOLLECTION ).insertOne( this ).then( r => callback( r ) ).catch( e => callback( e ) );
    };

}

module.exports = Challenge;