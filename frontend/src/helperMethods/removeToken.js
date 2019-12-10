const removeToken = ( props ) => {
    if ( localStorage.getItem( "TOKEN" ) ) {
        localStorage.removeItem( "TOKEN" );
        return props.history.push( "/login" );
    } else {
        //TODO: Maybe set a message before changing url so the user understands if they were logged out or not
        return props.history.push( "/login" );
    }
};

export default removeToken;