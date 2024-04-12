import { TrackerDAO } from '../../model/database/db_DAOs/TrackerDAO.js';
import { UserDAO } from '../../model/database/db_DAOs/userDAO.js';
import { mCurrentUser as mmCurrentUser, updateCurrentUser } from '../../main.js';


const mCurrentUser = mmCurrentUser;
const mTrackerDAO = new TrackerDAO();
const mUserDAO = new UserDAO();

const trackerId = new URLSearchParams(window.location.search).get("trackerId");

const outputDiv = document.getElementById("output-div");


async function loadSongsList(trackerId) {
	try {
		if (!mCurrentUser.checkTrackerExists(trackerId)) {
			await createSongsTrackerForUser(trackerId);
		}

		const tracker = await mTrackerDAO.getTracker(trackerId);

		tracker.songList.forEach((song) => {
			outputDiv.innerHTML += `<p>${song.title}</p>`;
		});
	}
	catch (error) {
		console.error("Error loading the Song list: ", error);
	}
}

async function createSongsTrackerForUser(trackerId) {
    try {
        const tracker = await mTrackerDAO.getTracker(trackerId);
        mCurrentUser.addTracker(tracker);

        updateCurrentUser(mCurrentUser);
        await mUserDAO.updateUser(mCurrentUser, mCurrentUser.userId);
    }
	catch (error) {
        console.error("Error creating the Song tracker for the user: ", error);
        throw error;
    }
}


loadSongsList(trackerId);