const Challenge = require( "../models/challenge" );

exports.addChallenge = ( req, res, next ) => {

    const user = req.user;
    const challenge = new Challenge( "Gym Workout", "Checklist", req.user._id, "This is a challenge to make sure we all workout x amount of times a month", "Workout 15 times a month" );

    const membersToChallenge = [ "cevin.thomas.ny@gmail.com", "jimmy.bjornhard@anegy.se" ];

    challenge.addMembersToChallenge( membersToChallenge );
    res.status( 200 ).send( challenge );
};