import { firestore } from "../firebaseConnection.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

class UserDAO {
	#db;

	constructor() {
		this.#db = firestore;
	}

	async prova() {
		console.log("prova");
		console.log(this.#db);

		try {
			const docRef = await addDoc(collection(this.#db, "users"), {
				first: "Ada",
				last: "Lovelace",
				born: 1815
			});
			console.log("Document written with ID: ", docRef.id);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	}

	async provaGet() {
		const querySnapshot = await getDocs(collection(this.#db, "users"));
		querySnapshot.forEach((doc) => {
			console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
			console.log(doc.data());
		});
	}

}


export { UserDAO };

