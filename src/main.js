import { initializeFirebase } from './model/database/firebaseConnection.js';
import { SESSION_STORAGE_KEYS } from './model/constants/storageConstants.js';


let mFirebaseApp = null;
let mFirestore = null;
let mFirebaseAuth = null;

let mCurrentUser = null;


async function init() {
	await init_Firebase();
	init_CurrentUser();
	console.log("current user: ", mCurrentUser); //TEST TEST TEST
}

/* async function init_Firebase() {
	if (sessionStorage.getItem("firebase_app") == null && sessionStorage.getItem("firestore") == null && sessionStorage.getItem("firebase_auth") == null) {
		await initializeFirebase().then((firebase_context) => {
			console.log("firebase_context", firebase_context); //TEST TEST TEST
			sessionStorage.setItem("firebase_app", JSON.stringify(firebase_context.firebase_app));
			sessionStorage.setItem("firestore", JSON.stringify(firebase_context.firestore));
			sessionStorage.setItem("firebase_auth", JSON.stringify(firebase_context.firebase_auth));


		});
	}
	else {
		mFirebaseApp = JSON.parse(sessionStorage.getItem("firebase_app"));
		mFirestore = JSON.parse(sessionStorage.getItem("firestore"));
		mFirebaseAuth = JSON.parse(sessionStorage.getItem("firebase_auth"));
	}
} */

async function init_Firebase() {
	await initializeFirebase().then((firebase_context) => {
		mFirebaseApp = firebase_context.firebase_app;
		mFirestore = firebase_context.firestore;
		mFirebaseAuth = firebase_context.firebase_auth;
	});
}

function init_CurrentUser() {
	if (sessionStorage.getItem(SESSION_STORAGE_KEYS.CURRENT_USER) != null) {
		mCurrentUser = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEYS.CURRENT_USER));
	}
}

init();


export { mFirebaseApp, mFirestore, mFirebaseAuth };