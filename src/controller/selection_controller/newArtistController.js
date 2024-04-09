import { TrackerDAO } from "../../model/database/db_DAOs/TrackerDAO";
import { Tracker } from "../../model/domain/business/Tracker";
import { Song } from "../../model/domain/business/Song";


const mTrackerDAO = new TrackerDAO();

const artistTextField = document.getElementById("new-artist-field-artist");
const descriptionTextField = document.getElementById("new-artist-field-description");
const logoTextField = document.getElementById("new-artist-field-logo");
const searchBackgroundImageTextField = document.getElementById("new-artist-field-search-background-image");
const backgroundImageTextField = document.getElementById("new-artist-field-background-image");
const songListTextField = document.getElementById("new-artist-field-song-list");

const submitNewArtistButton = document.getElementById("submit-new-artist-button");


function createNewTracker() {
	const artist = artistTextField.value;
	const description = descriptionTextField.value;
	const logo = logoTextField.value;
	const searchBackgroundImage = searchBackgroundImageTextField.value;
	const backgroundImage = backgroundImageTextField.value;
	const songList = songListTextField.value;

	let trackerObj = new Tracker(artist, description, logo, searchBackgroundImage, backgroundImage, songList);
	mTrackerDAO.saveTracker(trackerObj);
}

function checkFields() {
	if (artistTextField.value === "" || descriptionTextField.value === "" || logoTextField.value === "" || searchBackgroundImageTextField.value === "" || backgroundImageTextField.value === "" || songListTextField.value === "") {
		return false;
	}
	else {
		return true;
	}
}

async function createSongList() {
	const songListPath = songListTextField.value;

	result_list = [];

	try {
		const response = await fetch(songListPath);
		const songList = await response.json();

		for (const song in songList) {
			let s = new Song(song["Title"], song["Kanji Title"], song["Song Link"], song["Search on YT"], song["Single/Album"], song["Year"], song["Check"]);
			result_list.push(s);
		}

		return songList;
	} catch (error) {
		console.error('Error:', error);
		return [];
	}
}

//submitNewArtistButton.addEventListener("click", createNewTracker);