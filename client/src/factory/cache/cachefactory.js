export default class Cache {
    constructor(cache_id) {
        this.cache_id = cache_id;
        this.cache_storage = null;
    }

    static openCache() {
        return new Promise((resolve, reject) => {
            caches.open(this.cache_id).then(cache => {
                resolve(cache);
            })
        })
    }

    createCache = function(cache) {
        this.cache_storage = cache;
    }
}
