export function apiConnector(method, api, params, success, error) {
    let config = {
        method: method,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: (method === 'GET') ? null : JSON.stringify(params)
    }
    fetch(api, config)
        .then(res => {
            if(res.ok) return res;
            else error(res);
        })
        .then(res => { return res.json(); })
        .then(res => success(res))
}
