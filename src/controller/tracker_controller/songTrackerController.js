import { TrackerDAO } from '../../model/database/db_DAOs/TrackerDAO.js';
import { UserDAO } from '../../model/database/db_DAOs/userDAO.js';
import { mCurrentUser as mmCurrentUser, updateCurrentUser } from '../../main.js';


const mCurrentUser = mmCurrentUser;
const mTrackerDAO = new TrackerDAO();
const mUserDAO = new UserDAO();

const trackerId2 = new URLSearchParams(window.location.search).get("trackerId");

const outputDiv = document.getElementById("output-div");


function loadSongsList(trackerId) {
	createSongsTrackerForUser(trackerId)
		.then(() => {
			mTrackerDAO.getTracker(trackerId)
				.then((tracker) => {
					tracker.songList.forEach((song) => {
						outputDiv.innerHTML += `<p>${song.title}</p>`;
					});
				})
				.catch((error) => {
					console.error("ERROR", error);
				});
		});
}

function createSongsTrackerForUser(trackerId) {
	return new Promise((resolve, reject) => {
		if (!mCurrentUser.checkTrackerExists(trackerId)) {
			mTrackerDAO.getTracker(trackerId)
				.then((tracker) => {
					mCurrentUser.addTracker(tracker);
					updateCurrentUser(mCurrentUser);
					console.log("Tracker added to user!");

					mUserDAO.updateUser(mCurrentUser, mCurrentUser.userId)
						.then(() => {
							console.log("Tracker added to user!");
							resolve();
						})
						.catch((error) => {
							console.error("ERROR", error);
							reject();
						});
				})
				.catch((error) => {
					console.error("ERROR", error);
					reject();
				});
		}
		resolve();
	})
}


loadSongsList(trackerId2);