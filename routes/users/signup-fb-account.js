const fbServices = require('../../firebase/index.js');
const auth = fbServices.auth;
const db = fbServices.db;

module.exports = function signUpFirebaseAccountRoute(req, res) {
    let userSignupCredentials = req.body();
    let email = userSignupCredentials.email;
    let username = userSignupCredentials.username;
    let password = userSignupCredentials.password;
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            auth.currentUser.sendEmailVerification()
                .then(() => console.log('Verification email has been sent'))
                .catch(error => {
                    console.log(error);
                    res.send({
                        statusCode: 403,
                        resContext: 'SIGNUP-VERIFICATION-EMAIL',
                        resDescription: 'Unable to send sign-up verification email'
                    })
                })
        }).then(() => {
            let uid = auth.currentUser.uid;
            db.collection('Users').doc(uid).set({
                userId: uid,
                email: email,
                username: username,
                creatDate: Date.now()
            }).then(() => {
                console.log('User has been successfully created');
                res.send({
                    statusCode: 200,
                    resContext: 'SIGNUP-WITH-EMAIL-AND-PASSWORD',
                    resDescription: 'Account has been successfully created'
                });
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
                resContext: 'SIGNUP-WITH-EMAIL-AND-PASSWORD',
                resDescription: resDescription
            });
        })
}
