const Challenge = require( "../models/challenge" );

exports.addChallenge = ( req, res, next ) => {

    const user = req.user;
    //TODO: Format the endDate timestamp into human readable, then instantiate new object.
    const createdChallenge = new Challenge( req.body.name, req.body.type, user._id, req.body.description, req.body.goal, req.body.chosenSpace, req.body.listItems, req.body.endDate );
    /*createdChallenge.save( ( createdChallenge ) => {
        Challenge.addToSpaceAndUser( createdChallenge._id, user._id, req.body.chosenSpace );
    } );*/

    res.status( 200 ).send( createdChallenge );
};