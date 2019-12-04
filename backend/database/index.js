// Mongodb client
const MongoClient = require( "mongodb" ).MongoClient;

const url = "mongodb+srv://CevinThomas:Nygiants1@cluster0-xlcnc.mongodb.net/admin?retryWrites=true&w=majority";

let _db;
const mongoConnect = callback => {
    MongoClient.connect( url ).then( client => {
        console.log( "Connected to database" );
        _db = client.db( "alliance" );
        callback( client );
    } ).catch( err => {
        console.log( err );
        throw err;
    } );
};

const getDb = () => {
    if ( _db ) {
        return _db;
    }
    throw "No Database Found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;


