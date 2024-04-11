import { initializeFirebase } from './model/database/firebaseConnection.js';
import { SESSION_STORAGE_KEYS } from './model/constants/storageConstants.js';
import { User } from './model/domain/user/User.js';


const BASE_URL = window.location.href.includes('github.io') ? '/ArtistsSongsTracker' : '';

let mFirebaseApp = null;
let mFirestore = null;
let mFirebaseAuth = null;
let mFirebaseStorage = null;

let mCurrentUser = null;


async function init() {
	init_indexHTML();
	init_CurrentUser();
	await init_Firebase();

	console.log("current user: ", mCurrentUser); //TEST TEST TEST
}

async function init_Firebase() {
	await initializeFirebase()
		.then((firebase_context) => {
			mFirebaseApp = firebase_context.firebase_app;
			mFirestore = firebase_context.firestore;
			mFirebaseAuth = firebase_context.firebase_auth;
			mFirebaseStorage = firebase_context.firebase_storage;
		});
}

function init_CurrentUser() {
	if (sessionStorage.getItem(SESSION_STORAGE_KEYS.CURRENT_USER) != null) {
		mCurrentUser = User.fromJSON_special(JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEYS.CURRENT_USER)));
	}
}

function init_indexHTML() {
	if (window.location.href.includes("index.html")) {
		const registerButton = document.getElementById("register-button");
		registerButton.parentElement.href = `${BASE_URL}/src/view/registration.html`;
	}
}

function updateCurrentUser(currentUser) {
	sessionStorage.setItem(SESSION_STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
}

function showLoadingScreen() {
	const overlay = document.createElement('div');
	overlay.style.position = 'fixed';
	overlay.style.top = '0';
	overlay.style.left = '0';
	overlay.style.width = '100%';
	overlay.style.height = '100%';
	overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
	overlay.style.display = 'flex';
	overlay.style.justifyContent = 'center';
	overlay.style.alignItems = 'center';
	overlay.id = 'loading-indicator';

	const loadingText = document.createElement('p');
	loadingText.textContent = 'Loading...';
	loadingText.style.color = 'white';
	loadingText.style.fontSize = '2em';

	overlay.appendChild(loadingText);

	document.body.appendChild(overlay);
}

function hideLoadingScreen() {
	const loadingIndicator = document.getElementById('loading-indicator');

	if (loadingIndicator) {
		document.body.removeChild(loadingIndicator);
	}
}


init();


export { BASE_URL, mFirebaseApp, mFirestore, mFirebaseAuth, mFirebaseStorage, mCurrentUser, updateCurrentUser, showLoadingScreen, hideLoadingScreen };