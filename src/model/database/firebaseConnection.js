import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js';


const firebaseConfig = {
	apiKey: "AIzaSyDT9UDEkU6sxzAZCg0rANpdz-Fx2kYzGL4",
	authDomain: "artistssongstracker.firebaseapp.com",
	projectId: "artistssongstracker",
	storageBucket: "artistssongstracker.appspot.com",
	messagingSenderId: "494218829995",
	appId: "1:494218829995:web:83b69a8777a0ed331297ee"
};

let app = null;
let firestore = null;

function initializeFirebase() {
	return new Promise((resolve, reject) => {
		try {
			app = initializeApp(firebaseConfig);
			firestore = getFirestore(app);
			console.log("Firebase inizializzato con successo!");
			resolve();
		} catch (error) {
			console.error("Failed to initialize Firebase:", error);
			reject(error);
		}
	});
}

export { initializeFirebase, firestore };