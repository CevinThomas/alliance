import * as registrationConstants from "../../constants/registration";
import * as loginConstants from "../../constants/login";

const initialState = {
    //TODO: Refactor state
    userLoginCredentials: {
        name: "",
        email: "",
        password: "",
        response: {
            message: "",
            token: ""
        }
    },
    userLoginInformation: {
        email: "",
        password: "",
        response: {
            message: "",
            token: ""
        }
    },
};

function rootReducer( state = initialState, action ) {
    if ( action.type === registrationConstants.REGISTRATION_RESPONSE ) {
        //TODO: See if there is a better location to store the token
        if ( action.payload.token ) {
            if ( action.payload.token !== "" || action.payload.token !== undefined ) {
                localStorage.setItem( "TOKEN", action.payload.token );
            }
        }
        return {
            ...state,
            userLoginCredentials: {
                ...state.userLoginCredentials,
                response: {
                    ...state.userLoginCredentials.response,
                    message: action.payload.message,
                    token: action.payload.token
                }
            }
        };
    }
    if ( action.type === loginConstants.RESPONSE_LOGIN ) {
        if ( action.payload.token ) {
            if ( action.payload.token !== "" || action.payload.token !== undefined ) {
                localStorage.setItem( "TOKEN", action.payload.token );
            }
        }
        return {
            ...state,
            userLoginInformation: {
                ...state.userLoginInformation,
                response: {
                    ...state.userLoginInformation.response,
                    message: action.payload.message,
                    token: action.payload.token
                }
            }
        };
    }
    if ( action.type === loginConstants.EMAIL_LOGIN ) {
        return {
            ...state,
            userLoginInformation: {
                ...state.userLoginInformation,
                email: action.payload
            }
        };
    }
    if ( action.type === loginConstants.PASSWORD_LOGIN ) {
        return {
            ...state,
            userLoginInformation: {
                ...state.userLoginInformation,
                password: action.payload
            }
        };
    }
    if ( action.type === registrationConstants.NAME_REGISTRATION ) {
        return {
            ...state,
            userLoginCredentials: {
                ...state.userLoginCredentials,
                name: action.payload
            }
        };
    }
    if ( action.type === registrationConstants.EMAIL_REGISTRATION ) {
        return {
            ...state,
            userLoginCredentials: {
                ...state.userLoginCredentials,
                email: action.payload
            }
        };
    }
    if ( action.type === registrationConstants.PASSWORD_REGISTRATION ) {
        return {
            ...state,
            userLoginCredentials: {
                ...state.userLoginCredentials,
                password: action.payload
            }
        };
    }
    return state;
}

export default rootReducer;