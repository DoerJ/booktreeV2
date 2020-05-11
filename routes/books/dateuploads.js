const fbServices = require('../../firebase/firebase.js');
const db = fbServices.db;

var processData = (res, snapshots, _list) => {
    if(snapshots.size > 0) {
        snapshots.forEach(doc => {
            const data = doc.data();
            console.log('data: ', data);
            _list[data.uploadDate] = data;
        });
        const startDoc = snapshots.docs[snapshots.docs.length - 1];
        res.send({
            statusCode: 200,
            resContext: 'GET_BOOKS_BY_DATE',
            resDescription: 'Current page has been retrieved',
            resData: {
                startref: startDoc.data().uploadDate,
                list: _list
            }
        });
    } 
    else {
        res.send({
            statusCode: 200,
            resContext: 'GET_BOOKS_BY_DATE',
            resDescription: 'Empty page',
            resData: {
                startref: null,
                list: _list
            }
        })
    }
}

module.exports = function(req, res) {
    var _list = new Object();
    var startRef = req.query.startref;
    var limit = parseInt(req.query.limit);

    if(startRef === 'null') { // Initial fetch
        db.collection('BooksByDate').orderBy('uploadDate', 'desc').limit(limit)
            .get().then(snapshots => {
                processData(res, snapshots, _list);
            })
    } 
    else { // Fetch on scrolling
        console.log('fetching');
        var startDoc = db.collection('BooksByDate').doc(startRef).get().then(doc => {
            return doc;
        });
        startDoc.then(startDoc => {
            db.collection('BooksByDate').orderBy('uploadDate', 'desc').startAfter(startDoc)
            .limit(limit).get().then(snapshots => {
                processData(res, snapshots, _list);
            })
        });
    }
}
