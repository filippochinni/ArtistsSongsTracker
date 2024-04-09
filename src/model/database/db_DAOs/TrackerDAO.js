import { mFirestore } from "../../../main.js";
import { collection, addDoc, getDocs, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { DB_NODES } from "../db_costants/dbNodes.js";
import { Tracker } from "../../domain/business/Tracker.js";

export class TrackerDAO {
	#db;

	constructor() {
		this.#db = mFirestore;
	}

	async saveTracker(trackerObj) {
		try {
			await addDoc(collection(this.#db, DB_NODES.TRACKERS), trackerObj.toJSON());
			console.log("Tracker saved in db: ", trackerObj);
		} catch (e) {
			console.error("Error saving tracker in db: ", e);
		}
	}

	async getTracker(trackerId) {
		const docRef = doc(this.#db, DB_NODES.TRACKERS, trackerId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			console.log("Snapshot Result: ", docSnap.data());

			const tracker = Tracker.fromJSON(docSnap.data(), trackerId);
			return Promise.resolve(tracker);
		} else {
			console.error("There is no such data in the db!");
			return Promise.reject("No data found in the db");
		}
	}

}