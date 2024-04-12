import { mFirestore } from "../../../main.js";
import { collection, addDoc, getDocs, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { DB_NODES } from "../db_costants/dbNodes.js";
import { User } from "../../domain/user/User.js";


export class UserDAO {
	#db;

	constructor() {
		this.#db = mFirestore;
	}

	async saveUser(userObj, userId) {
		try {
			await setDoc(doc(this.#db, DB_NODES.USERS, userId), userObj.toJSON());
			
			console.log("User saved in db: ", userId, userObj); //LOG
		}
		catch (error) {
			console.error("Error saving User in db: ", error);
		}
	}

	async getUser(userId) {
		const docRef = doc(this.#db, DB_NODES.USERS, userId);
		const docSnap = await getDoc(docRef);

		if (!docSnap.exists()) {
			console.error("There is no such data in the db!");
			return null;
		}

		console.log("Snapshot Result (getUser): ", docSnap.data()); //LOG

		const user = User.fromJSON(docSnap.data(), userId);
		return user;
	}

	async updateUser(userObj, userId) {
		try {
			await setDoc(doc(this.#db, DB_NODES.USERS, userId), userObj.toJSON());
			
			console.log("User updated in db: ", userId, userObj); //LOG
		}
		catch (error) {
			console.error("Error updating User in db: ", error);
			throw error;
		}
	}

}

