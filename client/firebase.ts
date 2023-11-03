// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCxH_Qw66fLdygQxT4PNTPdfHiWtaj5rqo",
    authDomain: "project-81adc.firebaseapp.com",
    projectId: "project-81adc",
    storageBucket: "project-81adc.appspot.com",
    messagingSenderId: "309445393894",
    appId: "1:309445393894:web:16d59aab3ab2186c422a27",
    measurementId: "G-9SD1EY8GHP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
