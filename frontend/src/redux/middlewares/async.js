export default ( { dispatch } ) => next => action => {
    if ( !action.payload || !action.payload.then ) {
        return next( action );
    }

    console.log( "MIDDLEWARE" );

    action.payload.then( ( data ) => {
        const newAction = { ...action, payload: data };
        dispatch( newAction );
    } );
}

