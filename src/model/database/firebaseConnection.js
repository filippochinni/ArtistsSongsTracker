import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js';


const firebaseConfig = {
	apiKey: "AIzaSyDT9UDEkU6sxzAZCg0rANpdz-Fx2kYzGL4",
	authDomain: "artistssongstracker.firebaseapp.com",
	projectId: "artistssongstracker",
	storageBucket: "artistssongstracker.appspot.com",
	messagingSenderId: "494218829995",
	appId: "1:494218829995:web:83b69a8777a0ed331297ee"
};


function initializeFirebase() {
	return new Promise((resolve, reject) => {
		try {
			const firebase_app = initializeApp(firebaseConfig);
			const firestore = getFirestore(firebase_app);
			const firebase_auth = getAuth(firebase_app);
			const firebase_storage = getStorage(firebase_app);

			console.log("Firebase initialized successfully");

			resolve({firebase_app: firebase_app, firestore: firestore, firebase_auth: firebase_auth, firebase_storage: firebase_storage});
		} catch (error) {
			console.error("Failed to initialize Firebase:", error);
			reject(error);
		}
	});
}


export { initializeFirebase };