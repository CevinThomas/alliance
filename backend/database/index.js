// Mongodb client
const MongoClient = require( "mongodb" ).MongoClient;

const url = "mongodb+srv://CevinThomas:Nygiants1@cluster0-xlcnc.mongodb.net/admin?retryWrites=true&w=majority";
const dbName = "alliance";
const client = new MongoClient( url );

client.connect( function ( err ) {

    if ( err ) {
        console.log( err );
    }

    console.log( "Connected successfully to server" );

} );

module.exports = client;
