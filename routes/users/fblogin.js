const fbServices = require('../../firebase/firebase.js');
const auth = fbServices.auth;
const db = fbServices.db;

module.exports = function logInFirebaseAccountRoute(req, res) {
    const userLogInCredentials = req.body;
    const email = userLogInCredentials.email;
    const password = userLogInCredentials.password;
    var uid;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            if(!auth.currentUser.emailVerified) {
                res.send({
                    statusCode: 409,
                    resContext: 'LOGIN_WITH_EMAIL_AND_PASSWORD',
                    resDescription: 'Email not verified'
                });
            } else {
                uid = auth.currentUser.uid;
                req.session.key = uid;
                return ({
                    userId: uid,
                    loginTime: new Date(Date.now()).toString()
                })
            }
        })
        .then(values => {
            db.collection('Users').doc(uid).get()
                .then(doc => {
                    if(doc.exists) {
                        const data = doc.data();
                        let resData = {
                            ...values,
                            username: data.username
                        };
                        console.log('successful login')
                        res.send({
                            statusCode: 200,
                            resContext: 'LOGIN_WITH_EMAIL_AND_PASSWORD',
                            resDescription: 'Successfully logged in',
                            resData: resData
                        });
                    } else {
                        res.send({
                            statusCode: 404,
                            resContext: 'GET_USER_LOGIN_INFO',
                            resDescription: 'The user document doesn\'t exist'
                        });
                    }
                })
        })
        .catch(error => {
            let resDescription = '';
            console.log(error.message);
            switch (error.code) {
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
