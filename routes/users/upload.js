const fbServices = require('../../firebase/index.js');
const auth = fbServices.auth;
const db = fbServices.db;

module.exports = function uploadRoute(req, res) {
    var uploadInfo = req.body;
    const bookInfo = uploadInfo.info;
    const uid = uploadInfo.uid;
    const uploadType = bookInfo.type;

    // Merge upload into user doc
    var userRef = db.collection('Users').doc(uid);
    var setUserRef = userRef.set({
        uploads: {
            [uploadType]: bookInfo
        }
    }, { merge: true })
        .then(() => {
            res.send({
                statusCode: 200,
                resContext: `UPDATE-USER-WITH-${uploadType.toUpperCase()}-UPLOAD`,
                resDescription: `User has been updated with ${uploadType} upload`
            });
        })
}
