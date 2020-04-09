export const cacheManager = {

    cleanCaches: function(cache_names) {
        var cleanCachesPromise = cache_names.map(cache_name => {
            return new Promise((resolve, reject) => {
                caches.has(cache_name).then(exist => {
                    if(exist) {
                        caches.delete(cache_name).then(deleted => {
                            if(deleted) resolve(`Cache ${cache_name} cleaned`);
                            else reject(false);
                        })
                    } else {
                        resolve(`Cache ${cache_name} not existed`);
                    }
                })
            })
        });
        return Promise.all(cleanCachesPromise).then(values => {
            if(typeof values === 'boolean') return false;
            return true;
        })
    }
}
