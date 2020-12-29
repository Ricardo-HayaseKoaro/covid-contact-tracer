import { CREATE_ALERT } from './types';

// CREATE ALERT
export const createAlert = (msg, type) => {
    return {
        type: CREATE_ALERT,
        payload: {msg, type}
    };
};

