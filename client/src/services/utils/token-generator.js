export function generateToken(len) {
    const tokenStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var token = [];
    for(let i = 0; i < len; i++) {
        token.push(tokenStr[Math.floor(Math.random() * 61)]);
    }
    token = token.join('');
    return token;
}
