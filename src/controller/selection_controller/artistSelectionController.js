import { mCurrentUser as mmCurrentUser, showLoadingScreen, hideLoadingScreen } from "../../main.js";
import { TrackerDAO } from "../../model/database/db_DAOs/TrackerDAO.js";


const mCurrentUser = mmCurrentUser;
const isAdmin = mCurrentUser.admin;

const mTrackerDAO = new TrackerDAO();

const artistsTrackersDiv = document.getElementById("artists-trackers-div");
const newArtistButton = document.getElementById("new-artist-button");


async function loadTrackersList() {
    showLoadingScreen();

    try {
        const trackers = await mTrackerDAO.getAllTrackers();
		
        trackers.forEach((tracker) => {
            const artistTrackerElement = createArtistTrackerElement(tracker.trackerId, tracker.artist);
            artistsTrackersDiv.appendChild(artistTrackerElement);
        });
    }
	catch (error) {
        console.error("Error loading trackers list:", error);
    }
	finally {
        hideLoadingScreen();
    }
}

function createArtistTrackerElement(trackerId, artistName) {
	const artistTrackerElement = document.createElement("div");
	//artistTrackerElement.classList.add("artist-tracker-element");

	const artistNameElement = document.createElement("p");
	//artistNameElement.classList.add("artist-name");
	artistNameElement.textContent = artistName;

	const artistTrackerButton = document.createElement("button");
	//artistTrackerButton.classList.add("artist-tracker-button");
	artistTrackerButton.textContent = "View Tracker";
	artistTrackerButton.onclick = () => {
		window.location.href = `../../../../src/view/songTracker.html?trackerId=${trackerId}`;
	};

	artistTrackerElement.appendChild(artistNameElement);
	artistTrackerElement.appendChild(artistTrackerButton);

	return artistTrackerElement;
}

function init_ArtistSelectionPage() {
	newArtistButton.disabled = !isAdmin;
	loadTrackersList();
}


init_ArtistSelectionPage();
