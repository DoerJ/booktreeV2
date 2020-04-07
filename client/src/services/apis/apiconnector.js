export function apiConnector(method, api, params, success, error) {
    if(method === 'GET') {
        let url = new URL(window.location.href);
        for(let key of Object.keys(params)) {
            url.searchParams.append(key, params[key]);
        }
        api += url.search;
    }

    var cached = false;
    if(params.cache_id) {
        let openCache = new Promise((resolve, reject) => {
            caches.open(params.cache_id).then(cache => resolve(cache));
        })
        openCache.then(cache => {
            cache.match(api).then(res => {
                if(res) {
                    cached = true;
                    success(res);
                }
            })
        })
    }

    if(!cached) {
        var config = {
            method: method,
            mode: 'cors',
            cache: 'default',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'private'
            },
            body: (method === 'GET') ? null : JSON.stringify(params)
        }
        console.log('Calling API service: ', api);
        fetch(api, config)
            .then(res => {
                return res.json();
            })
            .then(res => {
                // TO DO: Put req and res pair in cache
                if(res.statusCode === 200) {
                    success(res);
                } else {
                    error(res);
                }
            })
    }
}
