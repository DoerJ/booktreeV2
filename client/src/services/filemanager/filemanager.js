import { firebaseStorageModel } from 'scripts.js';

const storage = firebaseStorageModel.storage;
const storageRef = firebaseStorageModel.storageRef;

export const fileManager = {
    uploadImage: function(image, cb) {
        var uploadTask = storageRef.child(`images/${image.name}`).put(image);
        uploadTask.on('state_changed', snapshot => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Uploading tasks is ', progress, '% done');
            switch (snapshot.state) {
                case storage.TaskState.PAUSED:
                    console.log('Uploading task is paused');
                    break;
                case storage.TaskState.RUNNING:
                    console.log('Uploading task is running...');
                    break;
            }
        }, error => {
            console.log('The upload is unsuccessful: ', error);
        }, () => {
            console.log('The upload is successful, getting download url...');
            uploadTask.snapshot.ref.getDownloadURL()
                .then(url => {
                    cb(url);
                })
        })
    }
}
