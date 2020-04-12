const fbServices = require('../../firebase/firebase.js');
const db = fbServices.db;

module.exports = function(req, res) {
    var list = new Object();

    if(req.query.startref === 'null') { // Initial fetch
        db.collection('BooksByDate').orderBy('uploadDate').limit(parseInt(req.query.limit))
            .get().then(snapshots => {
                snapshots.forEach(doc => {
                    const data = doc.data();
                    list[data.uploadDate] = data;
                });
                const startDoc = snapshots.docs[snapshots.docs.length - 1];
                const startRef = startDoc.data().uploadDate;
                res.send({
                    statusCode: 200,
                    resContext: 'GET_BOOKS_BY_DATE',
                    resDescription: 'Current page has been retrieved',
                    resData: {
                        start_ref: startRef,
                        list: list
                    }
                });
            })
    } else { // Fetch on scrolling
        console.log('ahhh');
    }
}
