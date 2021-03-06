const fbServices = require('../../firebase/firebase.js');
const auth = fbServices.auth;
const db = fbServices.db;

module.exports = function signUpFirebaseAccountRoute(req, res) {
    let userSignupCredentials = req.body;
    let email = userSignupCredentials.email;
    let username = userSignupCredentials.username;
    let password = userSignupCredentials.password;
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            let uid = auth.currentUser.uid;
            db.collection('Users').doc(uid).set({
                userId: uid,
                email: email,
                username: username,
                createDate: new Date(Date.now()).toString(),
                uploads: {}
            }).then(() => {
                console.log('User has been successfully created');
                console.log('Sending signup verification email...');
                auth.currentUser.sendEmailVerification()
                    .then(() => {
                        console.log('Verification email has been sent');
                        res.send({
                            statusCode: 200,
                            resContext: 'SIGNUP_WITH_EMAIL_AND_PASSWORD',
                            resDescription: 'User has been successfully created'
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        res.send({
                            statusCode: 403,
                            resContext: 'SIGNUP_VERIFICATION_EMAIL',
                            resDescription: 'Unable to send sign-up verification email'
                        });
                    })
            })
        }).catch(error => {
            let resDescription = '';
            switch (error.code) {
                case 'auth/invalid-email':
                    resDescription = 'Invalid email';
                    break;
                case 'auth/email-already-in-use':
                    resDescription = 'Email already in use';
                    break;
                case 'auth/weak-password':
                    resDescription = 'Choose a stronger password';
                    break;
                default:
                    resDescription = 'Unable to create account';
                    break;
            }
            res.send({
                statusCode: 403,
                resContext: 'SIGNUP_WITH_EMAIL_AND_PASSWORD',
                resDescription: resDescription
            });
        })
}
