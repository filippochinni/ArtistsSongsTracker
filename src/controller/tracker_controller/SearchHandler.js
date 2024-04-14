import { loadSongsList } from "./songListLoader.js";


const arrowDownImgPath = `../../../res/icons/sortIconDown.svg`;
const arrowUpImgPath = `../../../res/icons/sortIconUp.svg`;

const searchCriteriaStrings = {
	"Search by Name": "title",
	"Search by Album/Single": "single_album",
	"Search by Year": "year"
}

const trackFilterCriteriaStrings = {
	"Unheard Songs": "Unheard",
	"Heard Songs": "Heard",
	"Playlist Songs": "Playlist",
}

const sortCriteriaStrings = {
	"Song": "title",
	"Album": "single_album",
	"Year": "year"
}

export const trackerStatusStrings = {
	0: "Unheard",
	1: "Heard",
	2: "Playlist"
}


export class SearchHandler {
	#songsList;

	#statusSearch;
	#statusTrackFilter;
	#statusSort;

	#reverseSort;

	#searchButtons = document.querySelectorAll(".search-button");
	#trackFilterButtons = document.querySelectorAll(".track-filter-button");
	#sortButtons = document.querySelectorAll(".sort-button");

	constructor(songList) {
		this.#reverseSort = false;

		this.#statusSearch = this.initStatus(this.#searchButtons);
		this.#statusTrackFilter = this.initStatus(this.#trackFilterButtons);
		this.#statusSort = this.initStatus(this.#sortButtons);

		this.initButtons();

		this.#songsList = songList;

		this.searchMaster = this.searchMaster.bind(this);
		this.searchSongs = this.searchSongs.bind(this);
	}

	get songsList() {
		return this.#songsList;
	}

	set songsList(value) {
		this.#songsList = value;
	}

	get statusSearch() {
		return this.#statusSearch;
	}

	set statusSearch(value) {
		this.#statusSearch = value;
	}

	get statusTrackFilter() {
		return this.#statusTrackFilter;
	}

	set statusTrackFilter(value) {
		this.#statusTrackFilter = value;
	}

	get statusSort() {
		return this.#statusSort;
	}

	set statusSort(value) {
		this.#statusSort = value;
	}

	get reverseSort() {
		return this.#reverseSort;
	}

	set reverseSort(value) {
		this.#reverseSort = value;
	}

	initStatus(htmlElements) {
		const initialStatusValue = (htmlElements == this.#sortButtons) ? 0 : false;

		let statusObject = {};
		let propertiesStrings = [];

		for (let elem of htmlElements) {
			propertiesStrings.push(elem.textContent.trimEnd());
		}

		for (let i = 0; i < propertiesStrings.length; i++) {
			statusObject[propertiesStrings[i]] = initialStatusValue;
		}

		if (htmlElements == this.#searchButtons) {
			statusObject[propertiesStrings[0]] = true;
			htmlElements.item(0).classList.toggle("active-button", true);
		}

		return statusObject;
	}

	initButtons() {
		for (const button of this.#searchButtons) {
			button.addEventListener("click", () => this.activateSearchOption(button.textContent.trimEnd(), this.#statusSearch, [...this.#searchButtons]));
		}

		for (const button of this.#trackFilterButtons) {
			button.addEventListener("click", () => this.activateSearchOption(button.textContent.trimEnd(), this.#statusTrackFilter, [...this.#trackFilterButtons]));
		}

		for (const button of this.#sortButtons) {
			button.addEventListener("click", () => this.activateSortOption(button.textContent.trimEnd(), this.#statusSort, [...this.#sortButtons]));
		}
	}

	activateSearchOption(option, statusObject, buttonsArray) {
		statusObject[option] = !statusObject[option];

		for (const key in statusObject) {
			if (statusObject[key] && key != option) {
				statusObject[key] = false;
				buttonsArray.find(elem => elem.textContent == key).classList.toggle("active-button", false);
			}
		}

		const button = buttonsArray.find(elem => elem.textContent == option);
		button.classList.toggle("active-button", statusObject[option]);

		this.searchMaster()
	}

	activateSortOption(option, sortStatusObject, sortButtonsArray) {
		sortStatusObject[option] === 2 ? sortStatusObject[option] = 0 : sortStatusObject[option]++;

		for (const key in sortStatusObject) {
			if (sortStatusObject[key] !== 0 && key != option) {
				sortStatusObject[key] = 0;

				let tempButton = sortButtonsArray.find(elem => elem.textContent.trim() == key);
				tempButton.classList.toggle("active-button", false);

				tempButton.querySelector("img").src = "";
				tempButton.querySelector("img").style.display = "None";
			}
		}

		const button = sortButtonsArray.find(elem => elem.textContent.trim() == option);

		switch (sortStatusObject[option]) {
			case 0:
				button.classList.toggle("active-button", false);
				this.#reverseSort = false;
				button.querySelector("img").src = "";
				button.querySelector("img").style.display = "None";
				break;
			case 1:
				button.classList.toggle("active-button", true);
				this.#reverseSort = false;
				button.querySelector("img").src = arrowDownImgPath;
				button.querySelector("img").style.display = "block";
				break;
			case 2:
				button.classList.toggle("active-button", true);
				this.#reverseSort = true;
				button.querySelector("img").src = arrowUpImgPath;
				button.querySelector("img").style.display = "block";
				break;
			default:
				console.error("Errore Impossibile"); //LOG (impossibile)
		}

		this.searchMaster()
	}

	searchMaster() {
		const feedback = document.querySelector("#feedback");
		const feedbackText = `The Songs which satisfy the Search Criteria are in total `;

		const inputString = document.querySelector("#search-bar").value;

		if (!inputString && this.checkAllFalse(this.#statusTrackFilter)) {
			feedback.innerHTML = "";
			loadSongsList(this.searchSongs(this.songsList));
			return;
		}

		const resSongsArr = this.searchSongs(this.songsList, inputString);

		feedback.innerHTML = feedbackText + `<span>${resSongsArr.length}</span>`;

		loadSongsList(resSongsArr);
	}

	checkAllFalse(obj) {
		for (let key in obj) {
			if (obj[key]) {
				return false;
			}
		}
		return true;
	}

	searchSongs(songsArray, inputString) {
		let resArr = [];

		resArr = this.applySearchCriteria(songsArray, this.getCriteria(searchCriteriaStrings, this.#statusSearch), inputString);

		resArr = this.applyTrackerFilter(resArr, this.getCriteria(trackFilterCriteriaStrings, this.#statusTrackFilter));

		resArr = this.applySortCriteria(resArr, this.getCriteria(sortCriteriaStrings, this.#statusSort));

		return resArr;
	}

	applySearchCriteria(songsArray, searchCriteria, inputString) {
		if (!inputString) {
			return songsArray;
		}

		songsArray = songsArray.filter(song => {
			if (song[searchCriteria]) {
				return song[searchCriteria].toLowerCase().includes(inputString.toLowerCase());
			}
			return null;
		});

		return songsArray;
	}

	applyTrackerFilter(songsArray, trackerFilterCriteria) {
		if (trackerFilterCriteria) {
			songsArray = songsArray.filter(song => trackerStatusStrings[song.check] === trackerFilterCriteria);
		}

		return songsArray;
	}

	applySortCriteria(songsArray, sortCriteria) {
		songsArray.sort((a, b) => a[sortCriteria].toLowerCase() > b[sortCriteria].toLowerCase() ? 1 : -1);

		if (this.#reverseSort) {
			songsArray.reverse();
		}

		return songsArray;
	}

	getCriteria(criteriaConversionObject, statusObject) {
		let criteria;

		for (const key in statusObject) {
			if (statusObject[key]) {
				criteria = key;
			}
		}

		if (!criteria && criteriaConversionObject === sortCriteriaStrings) {
			return sortCriteriaStrings.Song;
		}

		if (!criteria) {
			return null;
		}

		return criteriaConversionObject[criteria];
	}


}