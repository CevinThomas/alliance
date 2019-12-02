// Mongodb client
const MongoClient = require( "mongodb" ).MongoClient;


// Connection URL
const url = "mongodb+srv://CevinThomas:Nygiants1@cluster0-xlcnc.mongodb.net/admin?retryWrites=true&w=majority";

// Database Name
const dbName = "alliance";

// Create a new MongoClient
const client = new MongoClient( url );

// Use connect method to connect to the Server
client.connect( function ( err ) {

    console.log( "Connected successfully to server" );

    const db = client.db( dbName );

    client.close();
} );

module.exports = client;
