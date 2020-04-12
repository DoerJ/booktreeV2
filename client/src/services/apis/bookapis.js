import { apiConnector } from 'scripts';

export const bookAPIs = {
    get_meuploads: (params, success, error) => {
        apiConnector('GET', '/api/book/me-uploads', params, success, error);
    },
    delete_meuploads: (params, success, error) => {
        apiConnector('POST', '/api/book/delete-uploads', params, success, error);
    },
    get_booksbydate: (params, success, error) => {
        apiConnector('GET', '/api/book/date-uploads', params, success, error);
    }
}
