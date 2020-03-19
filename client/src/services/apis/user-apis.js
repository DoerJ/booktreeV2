import { apiConnector } from 'scripts.js';

export const userAPIs = {
    signup: (params, success, error) => {
        apiConnector('POST', '/api/user/signup', params, success, error);
    },
    login: (params, success, error) => {
        apiConnector('POST', '/api/user/login', params, success, error);
    },
    logout: (params, success, error) => {
        apiConnector('POST', '/api/user/logout', params, success, error);
    },
    upload: (params, success, error) => {
        apiConnector('POST', '/api/user/upload', params, success, error);
    }
}
