import * as registrationConstants from "../../constants/registration";
import * as loginConstants from "../../constants/login";
import LOGGED_IN from "../../constants/token";
import * as spaceConstants from "../../constants/space";
import {SELECTED_SPACE, SEND_CURRENT_MEMBERS, SEND_CURRENT_SPACES} from "../../constants/space";
import * as userConstants from "../../constants/user";
import {SINGLE_USER_POPULATED_TASKS, USER_WITH_POPULATED_TASKS} from "../../constants/user";
import * as generalConstants from "../../constants/general";
import {IS_LOADING} from "../../constants/general";
import * as friendConstants from "../../constants/friends";
import * as taskConstants from "../../constants/tasks";
import {RESET_LOGIN_MESSAGE} from "../actions/types";

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
    typesOfTasks: [ "Checklist" ],
    chosenTaskType: "",
    usersSpaces: [],
    chosenSpace: "",
    checklistItems: [],
    endDateTimeStamp: "",

    showCheckModal: false,
    showChangeModal: false,
    showViewModal: false,
    showThankYouModal: false,

    viewFriend: {},
    updateFriendRequest: 0,
    currentSpaces: [],
    currentMembers: [],
    selectedSpace: "",
    usersWithPopulatedTasks: [],
    singleUserPopulatedWithTasks: "",
    isLoading: false,

};

//TODO: Create separate reducers depending on view
function rootReducer( state = initialState, action ) {

    if ( action.type === RESET_LOGIN_MESSAGE ) {
        return {
            ...state,
            userLoginInformation: {
                ...state.userLoginInformation,
                response: {
                    ...state.userLoginInformation.response,
                    message: ""
                }
            }
        };
    }

    if ( action.type === IS_LOADING ) {
        return {
            ...state,
            isLoading: action.payload
        };
    }

    if ( action.type === SINGLE_USER_POPULATED_TASKS ) {

        let userObject = {};
        let newState;
        if ( typeof action.payload !== "string" ) {
            action.payload.forEach( ( user ) => {
                userObject = user;
            } );
            newState = {
                ...state,
                singleUserPopulatedWithTasks: userObject
            };
        } else {
            newState = {
                ...state,
                singleUserPopulatedWithTasks: action.payload
            };
        }

        return newState;
    }

    if ( action.type === USER_WITH_POPULATED_TASKS ) {
        return {
            ...state,
            usersWithPopulatedTasks: action.payload
        };
    }

    if ( action.type === SELECTED_SPACE ) {

        let spaceObject = {};
        let newState;

        if ( typeof action.payload !== "string" ) {
            action.payload.forEach( ( space ) => {
                spaceObject = space;
            } );
            newState = {
                ...state,
                selectedSpace: spaceObject
            };
        } else {
            newState = {
                ...state,
                selectedSpace: action.payload
            };
        }

        return newState;


    }

    if ( action.type === SEND_CURRENT_MEMBERS ) {
        return {
            ...state,
            currentMembers: action.payload
        };
    }

    if ( action.type === SEND_CURRENT_SPACES ) {


        return {
            ...state,
            currentSpaces: action.payload
        };
    }

    if ( action.type === friendConstants.UPDATE_FRIEND_REQUEST ) {

        const incremented = state.updateFriendRequest + 1;

        return {
            ...state,
            updateFriendRequest: incremented
        };
    }

    if ( action.type === friendConstants.VIEW_FRIEND ) {
        return {
            ...state,
            viewFriend: action.payload
        };
    }

    if ( action.type === taskConstants.SHOW_THANK_YOU_MODAL ) {
        return {
            ...state,
            showThankYouModal: action.payload
        };
    }

    if ( action.type === taskConstants.END_DATE_CREATION ) {
        return {
            ...state,
            endDateTimeStamp: action.payload
        };
    }

    if ( action.type === taskConstants.RESET_TASK_CREATION ) {
        return {
            ...state,
            chosenTaskType: "",
            chosenSpace: "",
            checklistItems: [],
            showThankYouModal: false
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