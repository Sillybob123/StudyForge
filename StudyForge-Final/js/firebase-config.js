// Firebase Configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyB0h1WjvY1qNDci79VqxCjtKvyJtiyW134",
    authDomain: "studyforge-ad0c9.firebaseapp.com",
    projectId: "studyforge-ad0c9",
    storageBucket: "studyforge-ad0c9.firebasestorage.app",
    messagingSenderId: "312030492275",
    appId: "1:312030492275:web:103ad86fbeb9cf62d5dc06",
    measurementId: "G-1ZN8KM5KQC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
