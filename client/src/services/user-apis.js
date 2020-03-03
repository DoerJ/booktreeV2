import { apiConnector } from './core-api-connector';

export const userAPIs = {
    signup: (params, success, error) => {
        apiConnector('POST', '/api/signup', params, success, error);
    }
}
