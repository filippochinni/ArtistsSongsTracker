import { mFirebaseAuth } from '../../main.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js';


export class Authentication {
	#auth;

	constructor() {
		this.#auth = mFirebaseAuth;
	}

	async register(email, password) {
		try {
			const userCredential = await createUserWithEmailAndPassword(this.#auth, email, password);
			const userId = userCredential.user.uid;

			console.log("User registered successful:", userId); //LOG

			return userId;
		}
		catch (error) {
			console.error("Error registering user:", error);
			throw error;
		}
	}

	async login(email, password) {
		try {
			const userCredential = await signInWithEmailAndPassword(this.#auth, email, password);
			const userId = userCredential.user.uid;
			
			console.log("User login successful:", userId); //LOG
			
			return userId;
		}
		catch (error) {
			console.error("Error logging in user:", error);
			throw error;
		}
	}

	async logout() {
		try {
			await signOut(this.#auth);
			
			console.log("User logged out");	//LOG
		}
		catch (error) {
			console.error("Error logging out user:", error);
			throw error;
		}
	}

}