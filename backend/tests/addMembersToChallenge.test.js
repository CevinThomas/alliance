let membersToInvite = [];
const membersToChallenge = [ "cevin.thomas.ny@gmail.com", "jimmy.bjornhard@anegy.se" ];

const addMembersToChallenge = ( members ) => {
    members.map( ( member ) => {
        membersToInvite.push( member );
    } );
};

test( "Should return members in new array", () => {
    addMembersToChallenge( membersToChallenge );
    expect( membersToInvite ).toStrictEqual( [ "cevin.thomas.ny@gmail.com", "jimmy.bjornhard@anegy.se" ] );
} );