const fbServices = require('../../firebase/firebase.js');
const db = fbServices.db;

module.exports = function getMeUploadsRoute(req, res) {
    console.log('Fetching recent uploads ...');
    db.collection('Users').doc(req.query.uid).get()
        .then(doc => {
            if(doc.exists) {
                const data = doc.data();
                res.send({
                    statusCode: 200,
                    resData: data.uploads
                });
            } else {
                res.send({
                    statusCode: 404,
                    resContext: 'GET_USER_UPLOADS',
                    resDescription: 'The user document doesn\'t exist'
                });
            }
        })
}
