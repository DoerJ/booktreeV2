export function apiConnector(method, api, params, success, error) {
    if(method === 'GET') {
        let url = new URL(window.location.href);
        for(let key of Object.keys(params)) {
            url.searchParams.append(key, params[key]);
        }
        api += url.search;
    }
    var config = {
        method: method,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: (method === 'GET') ? null : JSON.stringify(params)
    }
    console.log('Calling API service: ', api);
    fetch(api, config)
        .then(res => {
            return res.json();
        })
        .then(res => {
            if(res.statusCode === 200) {
                success(res);
            } else {
                error(res);
            }
        })
}
