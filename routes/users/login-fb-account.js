const fbServices = require('../../firebase/index.js');
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
                    resContext: 'SIGNIN-WITH-EMAIL-AND-PASSWORD',
                    resDescription: 'Email not verified'
                });
            } else {
                req.session.key = user.uid;
                res.send({
                    statusCode: 200,
                    resContext: 'SIGNIN-WITH-EMAIL-AND-PASSWORD',
                    resDescription: 'Successfully logged in'
                })
            }
        }).catch(error => {
            let errorCode = error.code, errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
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
                resContext: 'SIGNIN-WITH-EMAIL-AND-PASSWORD',
                resDescription: resDescription
            });
        })

}
