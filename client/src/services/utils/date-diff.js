export function dateDiff(history) {
    var result = '';
    var diff = Date.now() - history,
        minutes = 1000 * 60,
        hours = minutes * 60,
        days = hours * 24,
        months = days * 30,
        years = months * 12;

    var _minutes = diff / minutes,
        _hours = diff / hours,
        _days = diff / days,
        _months = diff / months,
        _years = diff / years;

    if(_years >= 1) {
        result = parseInt(_years) + ' years ago';
    } else if(_months >= 1) {
        result = parseInt(_months) + ' months ago';
    } else if(_days >= 1) {
        result = parseInt(_days) + ' days ago';
    } else if(_hours >= 1) {
        result = parseInt(_hours) + ' hours ago';
    } else if(_minutes >= 1) {
        result = parseInt(_minutes) + ' minutes ago';
    } else {
        result = 'Just now';
    }
    return result;
}
