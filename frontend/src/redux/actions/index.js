import {SINGLE_USER_POPULATED_TASKS, USER_WITH_POPULATED_TASKS} from "../../constants/user";

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