const express = require( "express" );
const path = require( "path" );
const cookieParser = require( "cookie-parser" );
const logger = require( "morgan" );
const sassMiddleware = require( "node-sass-middleware" );
const userController = require( "./controllers/users" );
const challengeController = require( "./controllers/challenges" );
const spaceController = require( "./controllers/space" );
const auth = require( "./middleware/authentication" );
const mongoConnect = require( "./database/index" ).mongoConnect;
require( "dotenv" ).config();

const app = express();

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

app.get( "/api/sandbox", userController.sandbox );

mongoConnect( () => {
    app.listen( 8000 );
} );

module.exports = app;
