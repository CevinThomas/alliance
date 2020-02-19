import {SINGLE_USER_POPULATED_TASKS, USER_WITH_POPULATED_TASKS} from "../../constants/user";
import {IS_LOADING} from "../../constants/general";
import {RESET_LOGIN_MESSAGE} from "./types";
import {ADD_FRIEND, CURRENT_FRIENDS} from "../../constants/friends";

export const userPopulatedWithTasks = ( user ) => {
    return {
        type: USER_WITH_POPULATED_TASKS,
        payload: user
    };
};

export const singleUserPopulatedWithTasks = ( user ) => {
    return {
        type: SINGLE_USER_POPULATED_TASKS,
        payload: user
    };
};

export const isLoading = loading => {
    return {
        type: IS_LOADING,
        payload: loading
    };
};

export const resetLoginMessage = () => {
    return {
        type: RESET_LOGIN_MESSAGE
    };
};

export const addFriend = ( friendsEmail ) => {
    return {
        type: ADD_FRIEND,
        payload: friendsEmail
    };
};

export const currentFriends = ( currentFriends ) => {
    return {
        type: CURRENT_FRIENDS,
        payload: currentFriends
    };
};