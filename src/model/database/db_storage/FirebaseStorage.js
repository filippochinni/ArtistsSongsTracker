import { mFirebaseStorage } from "../../../main.js";
import { ref, getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";


export const TRACKERS_STORAGE_PATH = "Trackers/";

export class FirebaseStorage {
	#storage;

	constructor() {
		this.#storage = mFirebaseStorage;
	}

	uploadFile(file, fileType, path, trackerName) {
		return new Promise((resolve, reject) => {
			const storageRef = ref(this.#storage, `${path}${trackerName}/`);
			const fileRef = ref(storageRef, `${fileType}_(${file.name})`);

			uploadBytes(fileRef, file)
				.then((snapshot) => {
					console.log("File uploaded successfully", snapshot);

					getDownloadURL(fileRef)
						.then((url) => {
							console.log("File available at: ", url);
							resolve(url);
						})
						.catch((error) => {
							console.error("Error getting download URL: ", error);
							reject(error);
						});

				}).catch((error) => {
					console.error("Error uploading file: ", error);
					reject(error);
				});
		});
	}
}