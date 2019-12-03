const express = require( "express" );
const path = require( "path" );
const cookieParser = require( "cookie-parser" );
const logger = require( "morgan" );
const sassMiddleware = require( "node-sass-middleware" );
const userController = require( "./controllers/users" );
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

app.listen( 8000, () => {
    console.log( "We are up and running" );
} );

module.exports = app;
