const fbServices = require('../../firebase/firebase.js');
const firebase = require('firebase');
const db = fbServices.db;

module.exports = function(req, res) {

    var _uploads;
    var userRef = db.collection('Users').doc(req.body.uid);
    userRef.get().then(doc => {
        if(doc.exists) {
            _uploads = doc.data().uploads;
            delete _uploads[req.body.type][req.body.book_id];
        }
    }).then(() => {
        userRef.update({ uploads: _uploads }).then(() => {
            const date = req.body.upload_date;
            db.collection('BooksByDate').doc(new Date(date).toString()).delete().then(() => {
                res.send({
                    statusCode: 200,
                    resContext: 'DELETE_USER_UPLOADS',
                    resDescription: 'The book item has been successfully deleted'
                });
            })
        })
    })
}
