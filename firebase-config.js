import { firebase, getApp, getApps  } from "@react-native-firebase/storage";
import { upload } from "cloudinary-react-native";
import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPfLUd4OfFaKT3vCuQ-xKKREvZfOXpL40",
  authDomain: "unimarket-764cb.firebaseapp.com",
  projectId: "unimarket-764cb",
  storageBucket: "unimarket-764cb.appspot.com",
  messagingSenderId: "533470191245",
  appId: "1:533470191245:web:94f9f7fb175d09e65f8cc4"
};

// Initialize Firebase


    initializeApp(firebaseConfig)

/*const fbApp = getApp();
const fbStorage = getStorage();*/

/**
 * 
 * @param {*} uri 
 * @param {*} fileName  
 */
const uploadToFirebase = async (uri, fileName, onProgress) => {


    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();
    console.log(theBlob)


    const storageRef = ref(getStorage(), `images/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, theBlob);

    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress && onProgress(progress)
            console.log('Upload is ' + progress + '% done');

        }, 
        (error) => {
            // Handle unsuccessful uploads
            reject(error)
        }, 
        async () => {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
            resolve({
                downloadUrl,
                metadata : uploadTask.snapshot.metadata
            })
        }
        );
    });
}

export { uploadToFirebase}
