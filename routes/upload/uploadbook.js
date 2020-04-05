const fbServices = require('../../firebase/firebase.js');
const auth = fbServices.auth;
const db = fbServices.db;

module.exports = function uploadRoute(req, res) {
    var uploadInfo = req.body;
    const bookInfo = {
        ...uploadInfo.info,
        uploadDate: new Date(Date.now()).toString()
    }
    const uploadType = bookInfo.type;

    // Merge upload into user doc
    var userRef = db.collection('Users').doc(uploadInfo.uid);
    var setUserRef = new Promise((resolve, reject) => {
        userRef.set({
            uploads: {
                [uploadType]: {
                    [bookInfo.book_id]: bookInfo
                }
            }
        }, { merge: true })
            .then(() => {
                resolve(['userRef', {
                    resContext: 'SET_USERREF_WITH_UPLOAD',
                    resDescription: 'User has been updated with upload'
                }]);
            })
    });

    var setBooksByDateRef = new Promise((resolve, reject) => {
        db.collection('BooksByDate').doc(bookInfo.uploadDate).set(bookInfo)
            .then(() => {
                resolve(['booksByDateRef', {
                    resContext: 'SET_BOOKSBYDATEREF_WITH_UPLOAD',
                    resDescription: 'BooksByDate has been updated with upload'
                }]);
            })
    });
    Promise.all([setUserRef, setBooksByDateRef])
        .then(values => {
            var response = { statusCode: 200 };
            for(let [key, val] of values) {
                response[key] = val;
            }
            res.send(response);
        })
        .catch(error => {
            res.send({
                statusCode: 403,
                resContext: 'SET_REFS_WITH_UPLOAD',
                resDescription: `Error of uploading book: ${error.message}`
            })
        })
}
