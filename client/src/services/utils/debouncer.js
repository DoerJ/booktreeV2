export const debounce = (f, delay) => {
    let inDebounce;
    return function() {
        var self = this;
        var args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => f.apply(self, args), delay);
    }
}