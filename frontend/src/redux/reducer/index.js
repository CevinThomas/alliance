import * as registrationConstants from "../../constants/registration";
import * as loginConstants from "../../constants/login";
import LOGGED_IN from "../../constants/token";
import * as spaceConstants from "../../constants/space";
import * as userConstants from "../../constants/user";
import * as generalConstants from "../../constants/general";

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
    userIsOnline: false,
    spaceCredentials: {
        name: "",
        desc: ""
    },
    MainUserCredentials: {
        id: "",
        name: "",
        friends: []
    },
    friendsToInvite: [],
    showChallengerModal: false
};

//TODO: Create seperate reducers depending on view
function rootReducer( state = initialState, action ) {
    if ( action.type === spaceConstants.SPACE_CHALLENGERS ) {
        if ( action.payload.add ) {
            const toAdd = action.payload.add;
            const newArray = [ ...state.friendsToInvite ];
            newArray.push( toAdd );
            console.log( "To Add", toAdd );
            return {
                ...state,
                friendsToInvite: newArray
            };
        }
        if ( action.payload.remove ) {
            const toRemove = action.payload.remove;
            const indexOfRemove = state.friendsToInvite.indexOf( toRemove );
            console.log( indexOfRemove );
            const newArray = [ ...state.friendsToInvite ];
            newArray.splice( indexOfRemove, 1 );
            console.log( "To Remove", toRemove );
            return {
                ...state,
                friendsToInvite: newArray
            };
        }
        return {
            ...state,
            friendsToInvite: state.friendsToInvite + " " + action.payload
        };
    }
    if ( action.type === generalConstants.SHOW_MODAL ) {
        return {
            ...state,
            showChallengerModal: action.payload
        };
    }
    if ( action.type === userConstants.USER_CREDENTIALS ) {
        return {
            ...state,
            MainUserCredentials: {
                ...state.MainUserCredentials,
                id: action.payload._id,
                name: action.payload.name,
                friends: action.payload.friends
            }
        };
    }
    if ( action.type === spaceConstants.SPACE_NAME ) {
        return {
            ...state,
            spaceCredentials: {
                ...state.spaceCredentials,
                name: action.payload
            }
        };
    }
    if ( action.type === spaceConstants.SPACE_DESC ) {
        return {
            ...state,
            spaceCredentials: {
                ...state.spaceCredentials,
                desc: action.payload
            }
        };
    }
    if ( action.type === LOGGED_IN ) {
        return {
            ...state,
            userIsOnline: action.payload
        };
    }

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