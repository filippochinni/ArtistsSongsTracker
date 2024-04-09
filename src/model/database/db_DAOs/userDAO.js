import { mFirestore } from "../../../main.js";
import { collection, addDoc, getDocs, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { DB_NODES } from "../db_costants/dbNodes.js";

export class UserDAO {
	#db;

	constructor() {
		this.#db = mFirestore;
	}

	async saveUser(userObj, userId) {
		try {
			await setDoc(doc(this.#db, DB_NODES.USERS, userId), userObj.toJSON());
			console.log("User saved in db: ", userId, userObj);
		} catch (e) {
			console.error("Error saving user in db: ", e);
		}
	}

	async getUser(userId) {
		const docRef = doc(this.#db, DB_NODES.USERS, userId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			console.log("Snapshot Result: ", docSnap.data());
			return Promise.resolve(docSnap.data());
		} else {
			console.error("There is no such data in the db!");
			return Promise.reject("No data found in the db");
		}
	}

}

