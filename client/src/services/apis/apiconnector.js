export function apiConnector(method, api, params, success, error) {
    if(method === 'GET') {
        let url = new URL(window.location.href);
        for(let key of Object.keys(params)) {
            url.searchParams.append(key, params[key]);
        }
        api += url.search;
    }
    const config = {
        method: method,
        mode: 'cors',
        cache: 'default',
        headers: {
            'Content-Type': 'application/json'
        },
        body: (method === 'GET') ? null : JSON.stringify(params)
    }

    if(params.cache_id) {
        let openCache = new Promise((resolve, reject) => {
            caches.open(params.cache_id).then(cache => resolve(cache));
        });
        openCache.then(cache => {
            cache.match(api).then(res => {
                if(res) {
                    let fetchResponseBlob = new Promise((resolve, reject) => {
                        resolve(res.blob());
                    });
                    fetchResponseBlob
                        .then(blob => blob.text())
                        .then(text => {
                            success(JSON.parse(text));
                        })
                } else {
                    console.log('Calling API service: ', api);
                    fetch(api, config)
                        .then(res => res.json())
                        .then(res => {
                            if(res.statusCode === 200) {
                                let blob = new Blob([JSON.stringify(res)], { type: 'application/json' });
                                let response = new Response(blob, { 'status': 200, 'statusText': 'FETCHING_CACHE_OK' });
                                cache.put(api, response).then(() => success(res))
                            } else {
                                error(res);
                            }
                        })
                }
            })
        })
    } else {
        console.log('Calling API service: ', api);
        fetch(api, config)
            .then(res => res.json())
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
