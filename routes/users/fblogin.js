const fbServices = require('../../firebase/firebase.js');
const auth = fbServices.auth;
const db = fbServices.db;

module.exports = function logInFirebaseAccountRoute(req, res) {
    let userLogInCredentials = req.body;
    let email = userLogInCredentials.email;
    let password = userLogInCredentials.password;
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            if(!auth.currentUser.emailVerified) {
                res.send({
                    statusCode: 409,
                    resContext: 'LOGIN_WITH_EMAIL_AND_PASSWORD',
                    resDescription: 'Email not verified'
                });
            } else {
                req.session.key = auth.currentUser.uid;
                res.send({
                    statusCode: 200,
                    resContext: 'LOGIN_WITH_EMAIL_AND_PASSWORD',
                    resDescription: 'Successfully logged in',
                    userId: auth.currentUser.uid,
                    loginTime: new Date(Date.now()).toString()
                })
            }
        }).catch(error => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log('Error code: ', errorCode);
            console.log('Error message', errorMessage);
            let resDescription = '';
            switch (errorCode) {
                case 'auth/invalid-email':
                    resDescription = 'Invalid email';
                    break;
                case 'auth/user-not-found':
                    resDescription = 'User not found';
                    break;
                case 'auth/wrong-password':
                    resDescription = 'Password not correct';
                    break;
                default:
                    resDescription = 'Unable to log in';
                    break;
            }
            res.send({
                statusCode: 401,
                resContext: 'LOGIN_WITH_EMAIL_AND_PASSWORD',
                resDescription: resDescription
            });
        })

}
