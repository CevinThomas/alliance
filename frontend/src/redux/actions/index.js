import {USER_WITH_POPULATED_TASKS} from "../../constants/user";

export const userPopulatedWithTasks = ( user ) => {
    return {
        type: USER_WITH_POPULATED_TASKS,
        payload: user
    };
};