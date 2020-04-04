import { apiConnector } from 'scripts.js';

export const uploadAPIs = {
    upload_book: (params, success, error) => {
        apiConnector('POST', '/api/upload/book', params, success, error);
    }
}
