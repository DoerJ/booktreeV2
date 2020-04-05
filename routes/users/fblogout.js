const fbServices = require('../../firebase/firebase.js');
const auth = fbServices.auth;
const db = fbServices.db;

module.exports = function logOutFirebaseAccountRoute(req, res) {
    auth.signOut()
        .then(() => {
            req.session.destroy(error => {
                if(error) {
                    console.log('Error when destroying session');
                    throw new Error(error.message);
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
            res.send({
                statusCode: 403,
                resContext: 'LOGOUT_FIREBASE_ACCOUNT',
                resDescription: error.message
            })
        })
}
