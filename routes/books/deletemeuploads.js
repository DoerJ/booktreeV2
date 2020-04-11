const fbServices = require('../../firebase/firebase.js');
const firebase = require('firebase');
const db = fbServices.db;

module.exports = function(req, res) {

    var uploads;
    var userRef = db.collection('Users').doc(req.body.uid);
    userRef.get().then(doc => {
        if(doc.exists) {
            uploads = doc.data().uploads;
            delete uploads[req.body.type][req.body.book_id];
            return uploads;
        }
    }).then(data => {
        if(data) {
            userRef.update({ uploads: data }).then(() => {
                db.collection('BooksByDate').doc(req.body.upload_date).delete().then(() => {
                    res.send({
                        statusCode: 200,
                        resContext: 'DELETE_USER_UPLOADS',
                        resDescription: 'The book item has been successfully deleted'
                    });
                })
            })
        }
    })
}
