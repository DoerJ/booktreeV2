const fbServices = require('../../firebase/index.js');
const auth = fbServices.auth;
const db = fbServices.db;

module.exports = function uploadRoute(req, res) {
    var uploadInfo = req.body;
    const bookInfo = {
        ...uploadInfo.info,
        uploadDate: new Date(Date.now()).toString()
    }
    const uid = uploadInfo.uid;
    const uploadType = bookInfo.type;

    // Merge upload into user doc
    var userRef = db.collection('Users').doc(uid);
    var setUserRef = new Promise((resolve, reject) => {
        userRef.set({
            uploads: {
                [uploadType]: bookInfo
            }
        }, { merge: true })
            .then(() => {
                resolve(['userRef', {
                    resContext: 'SET_USERREF_WITH_UPLOAD',
                    resDescription: 'User has been updated with upload'
                }]);
            })
    });

    var setBookOnDateRef = new Promise((resolve, reject) => {
        db.collection('BookOnDate').doc(bookInfo.uploadDate).set(bookInfo)
            .then(() => {
                resolve(['bookOnDateRef', {
                    resContext: 'SET_BOOKONDATEREF_WITH_UPLOAD',
                    resDescription: 'BookOnDate has been updated with upload'
                }]);
            })
    });
    Promise.all([setUserRef, setBookOnDateRef])
        .then(values => {
            var response = { statusCode: 200 };
            for(let [key, val] of values) {
                response[key] = val;
            }
            res.send(response);
        })
        .catch(error => {
            console.log('Error code with upload: ', error.code);
            console.log('Error message with upload: ', error.message);
            res.send({
                statusCode: 403,
                resContext: 'SET_REFS_WITH_UPLOAD',
                resDescription: 'The book upload is unsuccessful'
            })
        })
}
