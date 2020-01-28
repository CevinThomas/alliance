const express = require( "express" );
const path = require( "path" );
const cookieParser = require( "cookie-parser" );
const logger = require( "morgan" );
const sassMiddleware = require( "node-sass-middleware" );
const userController = require( "./controllers/users" );
const challengeController = require( "./controllers/challenges" );
const spaceController = require( "./controllers/space" );
const friendsController = require( "./controllers/friends" );
const auth = require( "./middleware/authentication" );
const mongoConnect = require( "./database/index" ).mongoConnect;
const app = express();
const http = require( "http" ).createServer( app );
const io = require( "socket.io" )( http );
const morgan = require( "morgan" );
require( "./javascriptSandbox" );
require( "dotenv" ).config();

const rookout = require( "rookout" );
rookout.start( {
    token: "d693b5e9effe99aa98812840628c076ca33557037d051a94eb7b84507bfb4e0c"
} );

io.on( "connection", ( socket ) => {
    console.log( "a user is connected" );
    socket.on( "disconnect", function () {
        console.log( "user disconnected" );
    } );
    socket.on( "Test message", function ( msg ) {
        console.log( "message: " + msg );
    } );
} );

//TODO: Make Cors more detailed
const cors = require( "cors" );
app.use( cors() );
app.use( morgan( "combined" ) );
app.options( "*", cors() );

app.use( logger( "dev" ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( sassMiddleware( {
    src: path.join( __dirname, "public" ),
    dest: path.join( __dirname, "public" ),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
} ) );
app.use( express.static( path.join( __dirname, "public" ) ) );
app.post( "/api/add-user", userController.addUser );
app.post( "/api/login-user", userController.login );
app.post( "/api/logout-user", userController.logout );

app.post( "/api/create-space", auth, spaceController.createSpace );
app.post( "/api/add-users-to-space", auth, spaceController.addUsersToSpace );

app.post( "/api/add-challenge", auth, challengeController.addChallenge );
app.post( "/api/add-friends", auth, friendsController.addFriend );
app.post( "/api/accept-friend", auth, friendsController.acceptFriend );
app.post( "/api/accept-space", auth, spaceController.acceptSpaceInvite );
app.post( "/api/get-single-space", auth, spaceController.getSingleSpace );
app.post( "/api/leave-space", auth, spaceController.leaveSpace );
app.get( "/api/get-friends-invites", auth, friendsController.getFriendInvites );
app.get( "/api/get-friends-list", auth, friendsController.getFriends );
app.get( "/api/get-space-invites", auth, spaceController.getSpaceInvites );
app.get( "/api/get-spaces-from-user", auth, spaceController.getSpacesFromUser );
app.get( "/api/get-all-spaces", auth, spaceController.getAllSpaces );
app.get( "/api/get-user-tasks", auth, challengeController.getUserChallenges );
app.post( "/api/get-friend", auth, friendsController.getFriend );
app.post( "/api/remove-friend", auth, friendsController.removeFriend );
app.post( "/api/get-space-with-lookup", auth, spaceController.getSpaceWithLookup );
app.post( "/api/get-user-task-lookup", auth, spaceController.getUserWithTaskLookup );

app.put( "/api/update-space-credentials", auth, spaceController.updateSpaceCredentials );
app.put( "/api/update-task", auth, challengeController.updateChallenge );

app.delete( "/api/delete-space", auth, spaceController.deleteSpace );

app.get( "/api/me", auth, userController.getInformation );

app.get( "/api/sandbox", userController.sandbox );

mongoConnect( () => {
    http.listen( 8000 );
} );

module.exports = app;
