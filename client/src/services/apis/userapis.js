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
    get_meinfo: (params, success, error) => {
        apiConnector('GET', '/api/user/get-meinfo', params, success, error);
    },
    get_mestats: (params, success, error) => {
        apiConnector('GET', '/api/user/get-mestats', params, success, error);
    }
}
