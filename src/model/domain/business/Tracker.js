import { Song } from "./Song.js";


export class Tracker {
	#trackerId;
	#artist;
	#description;
	#logo;
	#searchBackgroundImage;
	#backgroundImage;
	#songList;

	constructor(artist, description, logo, searchBackgroundImage, backgroundImage, songList) {
		this.#artist = artist;
		this.#description = description;
		this.#logo = logo;
		this.#searchBackgroundImage = searchBackgroundImage;
		this.#backgroundImage = backgroundImage;
		this.#songList = songList;
	}

	get trackerId() {
		return this.#trackerId;
	}

	set trackerId(value) {
		this.#trackerId = value;
	}

	get artist() {
		return this.#artist;
	}

	set artist(value) {
		this.#artist = value;
	}

	get description() {
		return this.#description;
	}

	set description(value) {
		this.#description = value;
	}

	get logo() {
		return this.#logo;
	}

	set logo(value) {
		this.#logo = value;
	}

	get searchBackgroundImage() {
		return this.#searchBackgroundImage;
	}

	set searchBackgroundImage(value) {
		this.#searchBackgroundImage = value;
	}

	get backgroundImage() {
		return this.#backgroundImage;
	}

	set backgroundImage(value) {
		this.#backgroundImage = value;
	}

	get songList() {
		return this.#songList;
	}

	set songList(value) {
		this.#songList = value;
	}

	toJSON() {
		if (this.#trackerId) {
			return {
				trackerId: this.#trackerId,
				artist: this.#artist,
				description: this.#description,
				logo: this.#logo,
				searchBackgroundImage: this.#searchBackgroundImage,
				backgroundImage: this.#backgroundImage,
				songList: this.#songList.map((song) => song.toJSON())
			};
		}
		else {
			return {
				artist: this.#artist,
				description: this.#description,
				logo: this.#logo,
				searchBackgroundImage: this.#searchBackgroundImage,
				backgroundImage: this.#backgroundImage,
				songList: this.#songList.map((song) => song.toJSON())
			};
		}
	}

	static fromJSON(json, trackerId) {
		const tracker = new Tracker();

		tracker.#trackerId = trackerId;

		tracker.#artist = json.artist;
		tracker.#description = json.description;
		tracker.#logo = json.logo;
		tracker.#searchBackgroundImage = json.searchBackgroundImage;
		tracker.#backgroundImage = json.backgroundImage;
		tracker.#songList = json.songList.map((song) => Song.fromJSON(song));

		return tracker;
	}

	toString() {
		return `Tracker: {${this.#trackerId}, ${fieldNamesConversion.artist}:${this.#artist}, ${fieldNamesConversion.description}:${this.#description}, ${fieldNamesConversion.logo}:${this.#logo}, ${fieldNamesConversion.searchBackgroundImage}:${this.#searchBackgroundImage}, ${fieldNamesConversion.backgroundImage}:${this.#backgroundImage}, ${fieldNamesConversion.songList}:${this.#songList}}`;
	}

}

const fieldNamesConversion = {
	artist: "Artist",
	description: "Description",
	logo: "Logo",
	searchBackgroundImage: "Search Background Image",
	backgroundImage: "Background Image",
	songList: "Song List"
};