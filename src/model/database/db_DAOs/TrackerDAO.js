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

			console.log("Tracker saved in db: ", trackerObj); //LOG
		}
		catch (error) {
			console.error("Error saving Tracker in db: ", error);
		}
	}

	async getTracker(trackerId) {
		const docRef = doc(this.#db, DB_NODES.TRACKERS, trackerId);
		const docSnap = await getDoc(docRef);

		if (!docSnap.exists()) {
			console.error("There is no such data in the db!");
			return null;
		}
		
		console.log("Snapshot Result (getTracker): ", docSnap.data()); //LOG

		const tracker = Tracker.fromJSON(docSnap.data(), trackerId);
		return tracker;
	}

	async getAllTrackers() {
		let trackerList = [];
		
		const querySnapshot = await getDocs(collection(this.#db, DB_NODES.TRACKERS));
		
		if (querySnapshot.empty) {
			console.error("There is no such data in the db!");
			return null;
		}

		querySnapshot.forEach((doc) => {
			const tracker = Tracker.fromJSON(doc.data(), doc.id);
			trackerList.push(tracker);
		});

		return trackerList;
	}

}