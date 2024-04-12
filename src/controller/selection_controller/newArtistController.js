import { TrackerDAO } from "../../model/database/db_DAOs/TrackerDAO.js";
import { Tracker } from "../../model/domain/business/Tracker.js";
import { Song } from "../../model/domain/business/Song.js";
import { FirebaseStorage, TRACKERS_STORAGE_PATH } from "../../model/database/db_storage/FirebaseStorage.js";


const mTrackerDAO = new TrackerDAO();
const mFirebaseStorage = new FirebaseStorage();

const artistTextField = document.getElementById("new-artist-field-artist");
const descriptionTextField = document.getElementById("new-artist-field-description");
const logoTextField = document.getElementById("new-artist-field-logo-file");
const searchBackgroundImageTextField = document.getElementById("new-artist-field-search-backgroud-image-file");
const backgroundImageTextField = document.getElementById("new-artist-field-backgroud-image-file");
const songListTextField = document.getElementById("new-artist-field-songs-list-file");

const submitNewArtistButton = document.getElementById("submit-new-artist-button");


async function createNewTracker() {
	const artist = artistTextField.value;
	const description = descriptionTextField.value;
	const logoFile = logoTextField.files[0];
	const searchBackgroundImageFile = searchBackgroundImageTextField.files[0];
	const backgroundImageFile = backgroundImageTextField.files[0];
	const songListFile = songListTextField.files[0];

	if (!checkFields()) {
		alert("Please fill all the fields correctly");
		return;
	}

	try {
		const results = await uploadImages(artist, logoFile, searchBackgroundImageFile, backgroundImageFile);
		const logoUploadResult = results[0];
		const searchBackgroundImageUploadResult = results[1];
		const backgroundImageUploadResult = results[2];

		const songList = await createSongList(songListFile);
		const trackerObj = new Tracker(artist, description, logoUploadResult, searchBackgroundImageUploadResult, backgroundImageUploadResult, songList);
		await mTrackerDAO.saveTracker(trackerObj);
	}
	catch (error) {
		alert("Error creating new tracker. Please check the fields and try again.");
		console.error("Error creating new tracker:", error);
	}
}

function checkFields() {
	if (!artistTextField.value || !descriptionTextField.value || !logoTextField.files[0] || !searchBackgroundImageTextField.files[0] || !backgroundImageTextField.files[0] || !songListTextField.files[0]) {
		return false;
	}
	else {
		return true;
	}
}

function uploadImages(trackerName, logoFile, searchBackgroundImageFile, backgroundImageFile) {
	const promises = [
		mFirebaseStorage.uploadFile(logoFile, "Logo", TRACKERS_STORAGE_PATH, trackerName),
		mFirebaseStorage.uploadFile(searchBackgroundImageFile, "SearchBackgroundImage", TRACKERS_STORAGE_PATH, trackerName),
		mFirebaseStorage.uploadFile(backgroundImageFile, "BackgroundImage", TRACKERS_STORAGE_PATH, trackerName)
	];

	return Promise.all(promises);
}

function createSongList(file) {
	return new Promise((resolve, reject) => {
		let result_list = [];

		if (!file) {
			console.error('No file selected');
			reject('No file selected');
			return;
		}

		const reader = new FileReader();
		reader.onload = async (event) => {
			try {
				const songList = JSON.parse(event.target.result);

				for (const song of songList) {
					const s = new Song(song["Title"], song["Kanji Title"], song["Song"], song["Search on YT"], song["Single/Album"], song["Year"], song["Check"]);
					result_list.push(s);
				}

				resolve(result_list);
			}
			catch (error) {
				console.error('Error parsing JSON file:', error);
				reject(error);
			}
		};

		reader.onerror = (error) => reject(error);
		reader.readAsText(file);
	});
}


submitNewArtistButton.addEventListener("click", createNewTracker);