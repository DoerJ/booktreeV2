const fbServices = require('../../firebase/firebase.js');
const auth = fbServices.auth;
const db = fbServices.db;

module.exports = function getMeInfoRoute(req, res) {
    db.collection('Users').doc(req.query.uid).get()
        .then(doc => {
            if(doc.exists) {
                const data = doc.data();
                res.send({
                    statusCode: 200,
                    resData: {
                        username: data.username
                    }
                });
            } else {
                res.send({
                    statusCode: 404,
                    resContext: GET_ME_INFO,
                    resDescription: 'The user document doesn\'t exist'
                })
            }
        }).catch(error => {
            console.log('Error of getting document: ', error);
        })
}
