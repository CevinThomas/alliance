const getToken = () => {
    let token;
    if ( localStorage.getItem( "TOKEN" ) ) {
        token = localStorage.getItem( "TOKEN" );
        return token;
    } else {
        return false;
    }
};

export default getToken;