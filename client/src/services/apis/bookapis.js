import { apiConnector } from 'scripts';

export const bookAPIs = {
    get_uploads: (params, success, error) => {
        apiConnector('GET', 'api/book/uploads', params, success, error);
    }
}
