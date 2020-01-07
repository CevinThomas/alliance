import * as registrationConstants from "../../constants/registration";
import * as loginConstants from "../../constants/login";
import LOGGED_IN from "../../constants/token";
import * as spaceConstants from "../../constants/space";
import * as userConstants from "../../constants/user";
import * as generalConstants from "../../constants/general";
import * as friendConstants from "../../constants/friends";
import * as taskConstants from "../../constants/tasks";

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
    showChallengerModal: false,
    friendRequests: [],
    addFriend: "",
    friendsList: [],
    incomingSpaceInvites: [],
    //TODO: Make typesOfTasks environment variables
    typesOfTasks: [ "Checklist", "Single", "Big", "Small" ],
    chosenTaskType: "",
    usersSpaces: [],
    chosenSpace: "",
    checklistItems: [],

    showCheckModal: false,
    showChangeModal: false,
    showViewModal: false
};

//TODO: Create seperate reducers depending on view
function rootReducer( state = initialState, action ) {

    if ( action.type === taskConstants.RESET_TASK_CREATION ) {
        return {
            ...state,
            chosenTaskType: "",
            chosenSpace: "",
            checklistItems: []
        };
    }

    if ( action.type === taskConstants.SHOW_CHECKBOX_MODAL ) {
        return {
            ...state,
            showCheckModal: action.payload
        };
    }

    if ( action.type === taskConstants.SHOW_CHANGE_MODAL ) {
        return {
            ...state,
            showCheckModal: action.payload
        };
    }

    if ( action.type === taskConstants.SHOW_VIEW_MODAL ) {
        return {
            ...state,
            showCheckModal: action.payload
        };
    }

    if ( action.type === taskConstants.CREATE_TASK_ITEM ) {
        let newItemCreated = [];
        newItemCreated.push( action.payload );

        const listOfItems = state.checklistItems.concat( newItemCreated );
        return {
            ...state,
            checklistItems: listOfItems
        };
    }

    if ( action.type === taskConstants.CHOSEN_SPACE ) {
        return {
            ...state,
            chosenSpace: action.payload
        };
    }

    if ( action.type === spaceConstants.USERS_SPACES ) {

        let spacesArray = [];
        action.payload.map( ( spaceObject ) => {
            spacesArray.push( spaceObject );
        } );

        return {
            ...state,
            usersSpaces: spacesArray
        };
    }

    if ( action.type === taskConstants.CHOSEN_TASK_TYPE ) {
        return {
            ...state,
            chosenTaskType: action.payload
        };
    }

    if ( action.type === userConstants.USER_INCOMING_SPACE_INVITES ) {
        console.log( action.payload );
        let spaceInvites = [];
        action.payload.map( ( invite ) => {
            spaceInvites.push( invite );
        } );
        return {
            ...state,
            incomingSpaceInvites: spaceInvites
        };
    }

    if ( action.type === friendConstants.CURRENT_FRIENDS ) {
        const newArray = [];
        action.payload.map( ( friend ) => {
            newArray.push( friend );
        } );
        return {
            ...state,
            friendsList: newArray
        };
    }

    if ( action.type === friendConstants.ADD_FRIEND ) {
        return {
            ...state,
            addFriend: action.payload
        };
    }

    if ( action.type === friendConstants.FRIEND_REQUESTS ) {
        const newArray = [];
        action.payload.map( ( request ) => {
            newArray.push( request );
        } );
        return {
            ...state,
            friendRequests: newArray
        };
    }


    if ( action.type === spaceConstants.SPACE_CHALLENGERS ) {
        if ( action.payload.add ) {
            const toAdd = action.payload.add;
            const newArray = [ ...state.friendsToInvite ];
            newArray.push( toAdd );
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
        let friendsArray = [];
        if ( action.payload.friends.length !== 0 ) {
            action.payload.friends.map( ( friend ) => {
                friendsArray.push( friend );
            } );
        }
        return {
            ...state,
            MainUserCredentials: {
                ...state.MainUserCredentials,
                id: action.payload._id,
                name: action.payload.name,
                friends: friendsArray
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