const spaces = [
    {
        _id: "123",
        challengers: [ "123", "345", "678" ],
        name: "test",
        description: "testDesc"
    },
    {
        _id: "456",
        challengers: [ "123", "592" ],
        name: "secondTest",
        description: "secondDesc"
    }
];

const users = [
    {
        _id: "123",
        name: "Cevin"
    },
    {
        _id: "678",
        name: "John"
    }
];

result = spaces.map( ( { _id, challengers } ) => ({
    _id,
    challengers: challengers.map( challenger =>
        users.find( user => user._id === challenger )
    ).filter( row => row )
}) );
