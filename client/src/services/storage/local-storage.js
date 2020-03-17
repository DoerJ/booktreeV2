export const localStorage = {
    addItem: (key, val) => {
        localStorage.setItem(key, val);
    },
    getItem: key => {
        return localStorage.getItem(key);
    },
    removeItem: key => {
        localStorage.removeItem(key);
    },
    removeAll: () => {
        localStorage.clear();
    }
}
