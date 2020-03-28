const fbServices = require('../../firebase/index.js');
const auth = fbServices.auth;
const db = fbServices.db;

module.exports = function logOutFirebaseAccountRoute(req, res) {
    auth.signOut()
        .then(() => {
            req.session.destroy(error => {
                if(error) {
                    console.log('Error when destroying session');
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                    throw new Error(errorMessage);
                } else console.log('Session has been destroyed');
            })
            if(!auth.currentUser) {
                res.send({
                    statusCode: 200,
                    resContext: 'LOGOUT_FIREBASE_ACCOUNT',
                    resDescription: 'You have successfully logged out'
                })
            }
        }).catch(error => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            res.send({
                statusCode: 403,
                resContext: 'LOGOUT_FIREBASE_ACCOUNT',
                resDescription: 'Unable to log out'
            })
        })
}
