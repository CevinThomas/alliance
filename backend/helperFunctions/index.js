exports.getToken = ( req ) => {
    if ( req.headers["authorization"] ) {
        return req.headers["authorization"].split( "Bearer " )[1].trim();
    } else {
        return false;
    }
};