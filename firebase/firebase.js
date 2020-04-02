const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyARj2s5ydjoySej219sRnM7L-cJ6d-4jpk",
    authDomain: "booktree-v2.firebaseapp.com",
    databaseURL: "https://booktree-v2.firebaseio.com",
    projectId: "booktree-v2",
    storageBucket: "booktree-v2.appspot.com",
    messagingSenderId: "817673862458",
}

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

module.exports = {
    firebase: firebase,
    db: db,
    auth: auth
}
