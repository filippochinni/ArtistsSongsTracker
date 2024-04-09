import { mFirebaseAuth } from '../../main.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js';


export class Authentication {
	#auth;

	constructor() {
		this.#auth = mFirebaseAuth;
	}

	register(email, password) {
		console.log("auth", this.#auth); //TESTETSTESTTES
		return new Promise((resolve, reject) => {
			createUserWithEmailAndPassword(this.#auth, email, password)
				.then((userCredential) => {
					const userId = userCredential.user.uid;
					console.log("User registered successful:", userId);
					resolve(userId);
				})
				.catch((error) => {
					console.error("Error registering user:", error);
					reject(error);
				});
		});
	}

	login(email, password) {
		return new Promise((resolve, reject) => {
			signInWithEmailAndPassword(this.#auth, email, password)
				.then((userCredential) => {
					const userId = userCredential.user.uid;
					console.log("User login successful:", userId);
					resolve(userId);
				})
				.catch((error) => {
					console.error("Error logging in user:", error);
					reject(error);
				});
		});
	}

	logout() {
		return new Promise((resolve, reject) => {
			this.#auth.signOut()
				.then(() => {
					console.log("User logged out");
					resolve();
				})
				.catch((error) => {
					console.error("Error logging out user:", error);
					reject(error);
				});
		});
	}

}