import { mFirebaseStorage } from "../../../main.js";
import { ref, getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";


export const USERS_STORAGE_PATH = "Users/";
export const TRACKERS_STORAGE_PATH = "Trackers/";

export class FirebaseStorage {
	#storage;

	constructor() {
		this.#storage = mFirebaseStorage;
	}

	async uploadFile(file, fileType, path, trackerName) {
		try {
			const storageRef = ref(this.#storage, `${path}${trackerName}/`);
			const fileRef = ref(storageRef, `${fileType}_(${file.name})`);
	
			const snapshot = await uploadBytes(fileRef, file);
			const url = await getDownloadURL(fileRef);

			console.log("File uploaded: ", snapshot, url); //LOG
	
			return url;
		}
		catch (error) {
			console.error("Error uploading file: ", error);
			throw error;
		}
	}
	
}