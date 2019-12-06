import * as registrationConstants from "../../constants/registration";

const initialState = {
    userLoginCredentials: {
        name: "",
        email: "",
        password: ""
    }
};

function rootReducer( state = initialState, action ) {
    if ( action.type === registrationConstants.NAME_REGISTRATION ) {
        return {
            ...state,
            userLoginCredentials: {
                name: action.payload
            }
        };
    }
    return state;
}

export default rootReducer;