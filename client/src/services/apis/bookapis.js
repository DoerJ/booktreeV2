import { apiConnector } from 'scripts';

export const bookAPIs = {
    get_meuploads: (params, success, error) => {
        apiConnector('GET', '/api/book/me-uploads', params, success, error);
    }
}
