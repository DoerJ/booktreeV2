const fbServices = require('../../firebase/firebase.js');
const db = fbServices.db;

module.exports = function(req, res) {
    var _list = new Object();

    if(req.query.startref === 'null') { // Initial fetch
        db.collection('BooksByDate').orderBy('uploadDate', 'desc').limit(parseInt(req.query.limit))
            .get().then(snapshots => {
                if(snapshots.size > 0) {
                    snapshots.forEach(doc => {
                        const data = doc.data();
                        _list[data.uploadDate] = data;
                    });
                    const startDoc = snapshots.docs[snapshots.docs.length - 1];
                    const startRef = startDoc.data().uploadDate;
                    res.send({
                        statusCode: 200,
                        resContext: 'GET_BOOKS_BY_DATE',
                        resDescription: 'Current page has been retrieved',
                        resData: {
                            start_ref: startRef,
                            list: _list
                        }
                    });
                } else {
                    res.send({
                        statusCode: 200,
                        resContext: 'GET_BOOKS_BY_DATE',
                        resDescription: 'Empty page',
                        resData: {
                            start_ref: null,
                            list: _list
                        }
                    })
                }
            })
    } else { // Fetch on scrolling
        console.log('ahhh');
    }
}
