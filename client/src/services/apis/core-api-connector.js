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
        .then(res => { return res.json(); })
        .then(res => {
            if(res.statusCode === 200) success(res);
            else error(res);
        })
}
