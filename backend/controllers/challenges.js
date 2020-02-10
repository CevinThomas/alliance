const Challenge = require( "../models/challenge" );

exports.addChallenge = ( req, res, next ) => {

    const user = req.user;

    const createdChallenge = new Challenge( req.body.name, req.body.type, user._id, req.body.description, req.body.goal, req.body.chosenSpace, req.body.endDate );
    createdChallenge.save( ( createdChallenge ) => {
        Challenge.findTaskById( createdChallenge.ops[0]._id, ( task ) => {
            Challenge.insertSecondaryTasks( req.body.listItems, task._id );
            Challenge.addToSpaceAndUser( task._id, user._id, req.body.chosenSpace );
            //TODO: Move 200 status code into this block, and do error checking
            res.status( 200 ).send( createdChallenge );
        } );
    } );
};

exports.getUserChallenges = async ( req, res, next ) => {
    const usersTasks = await Challenge.getAllTasksFromUser( req.user );
    res.status( 200 ).send( usersTasks[0].populatedTasks );
};

exports.updateChallenge = async ( req, res, next ) => {
    const updated = await Challenge.updateTask( req.body.selectedTaskToEdit, req.body.idToEdit );
    if ( req.body.selectedTaskToEdit.completed === true ) {
        const added = Challenge.addTaskToCompletedArray( req.body.selectedTaskToEdit, req.user._id );
    }
    //TODO: Check if updated result is OK
    res.status( 200 ).send( req.body.selectedTaskToEdit );
};