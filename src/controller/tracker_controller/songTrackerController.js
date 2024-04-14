import { TrackerDAO } from '../../model/database/db_DAOs/TrackerDAO.js';
import { UserDAO } from '../../model/database/db_DAOs/userDAO.js';
import { mCurrentUser as mmCurrentUser, updateCurrentUser } from '../../main.js';
import { SearchHandler } from './searchHandler.js';
import { loadSongsList } from './songListLoader.js';


const mCurrentUser = mmCurrentUser;
const mTrackerDAO = new TrackerDAO();
const mUserDAO = new UserDAO();

const trackerId = new URLSearchParams(window.location.search).get("trackerId");

let mSeachHandler = null;


const subtitleText = `The are currently ("Albumless" included) $$$ Minami's Songs`;
const feedbackText = `The Songs which satisfy the Search Criteria are in total `;

const searchBarPlaceholder = `Search by Name, Album or Year...`;

const trackUpdateButtonText = `Change Status`;


const title = document.querySelector("#title");
const subtitle = document.querySelector("#subtitle");
const feedback = document.querySelector("#feedback");

const searchBar = document.querySelector("#search-bar");


async function initSongsTrackerPage(trackerId) {
	try {
		if (!mCurrentUser.checkTrackerExists(trackerId)) {
			await createSongsTrackerForUser(trackerId);
		}

		const tracker = mCurrentUser.getTracker(trackerId);
		let songList = tracker.songList;

		const trackerDatabase = await mTrackerDAO.getTracker(trackerId);

		if (trackerDatabase.songList.length !== songList.length) {
			songList = await updateSongListForUser(trackerDatabase, tracker);
		}

		subtitleText.replace("$$$", songList.length);

		mSeachHandler = new SearchHandler(songList);

		searchBar.addEventListener("input", mSeachHandler.searchMaster);

		loadSongsList(songList);
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

async function updateSongListForUser(trackerDatabase, trackerUserCurrent) {
	const userCurrentSongList = trackerUserCurrent.songList;
	const updatedTracker = trackerDatabase;

    const updatedSongList = trackerDatabase.songList.map((elem) => {
        let temp = userCurrentSongList.find(song => song.title === elem.title);
        elem.check = temp ? temp.check : elem.check;
        return elem;
    });

	updatedTracker.songList = updatedSongList;

	mCurrentUser.updateTracker(updatedTracker);
	updateCurrentUser(mCurrentUser);
	await mUserDAO.updateUser(mCurrentUser, mCurrentUser.userId);

    return updatedSongList;
}

export function updateTrackStatus(song) {
	const oldTracker = mCurrentUser.getTracker(trackerId); //DA rivedere
	const songList = mCurrentUser.getTracker(trackerId).songList;

    const trackStatus = song.check;
    const songIndex = songList.findIndex(elem => elem.title === song.title);

	const updatedSongList = songList; //DA rivedere

    switch(trackStatus) {
        case 0:
            songList[songIndex].check++;
            break;
        case 1:
            songList[songIndex].check++;
            break;
        case 2:
            songList[songIndex].check = 0;
            break;
        default:
            console.error("Errore Impossibile") //LOG (impossibile)
    }


	const updatedTracker = oldTracker; //DA rivedere
	updatedTracker.songList = updatedSongList; //DA rivedere

	mCurrentUser.updateTracker(updatedTracker); //DA rivedere
	updateCurrentUser(mCurrentUser); //DA rivedere
	mUserDAO.updateUser(mCurrentUser, mCurrentUser.userId); //DA rivedere

    mSeachHandler.searchMaster()
}


initSongsTrackerPage(trackerId);