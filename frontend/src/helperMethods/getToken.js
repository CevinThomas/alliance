import Axios from "axios";

const getToken = () => {
    let token;
    if ( localStorage.getItem( "TOKEN" ) ) {
        token = localStorage.getItem( "TOKEN" );
    } else {
        token = false;
    }
    if ( token !== false ) {
        return Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        return Axios.defaults.headers.common["Authorization"] = null;
    }
};

export default getToken;