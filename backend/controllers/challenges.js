const Challenge = require( "../models/challenge" );

exports.addChallenge = ( req, res, next ) => {

    const user = req.user;
    const challenge = new Challenge( req.body.name, req.body.type, req.user._id, req.body.description, req.body.goal );

    const membersToChallenge = [ "cevin.thomas.ny@gmail.com", "jimmy.bjornhard@anegy.se" ];

    challenge.addMembersToChallenge( membersToChallenge );
    res.status( 200 ).send( challenge );
};