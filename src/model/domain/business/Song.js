export class Song {
	#title;
	#kanji_title;
	#song_link;
	#search_on_YT;
	#single_album;
	#year;
	#check;

	constructor(title, kanji_title, song_link, search_on_YT, single_album, year, check) {
		this.#title = title;
		this.#kanji_title = kanji_title;
		this.#song_link = song_link;
		this.#search_on_YT = search_on_YT;
		this.#single_album = single_album;
		this.#year = year;
		this.#check = check;
	}

	get title() {
		return this.#title;
	}

	set title(value) {
		this.#title = value;
	}

	get kanji_title() {
		return this.#kanji_title;
	}

	set kanji_title(value) {
		this.#kanji_title = value;
	}

	get song_link() {
		return this.#song_link;
	}

	set song_link(value) {
		this.#song_link = value;
	}

	get search_on_YT() {
		return this.#search_on_YT;
	}

	set search_on_YT(value) {
		this.#search_on_YT = value;
	}

	get single_album() {
		return this.#single_album;
	}

	set single_album(value) {
		this.#single_album = value;
	}

	get year() {
		return this.#year;
	}

	set year(value) {
		this.#year = value;
	}

	get check() {
		return this.#check;
	}

	set check(value) {
		this.#check = value;
	}

	toJSON() {
		return {
			title: this.#title,
			kanji_title: this.#kanji_title,
			song_link: this.#song_link,
			search_on_YT: this.#search_on_YT,
			single_album: this.#single_album,
			year: this.#year,
			check: this.#check
		};
	}

	static fromJSON(json) {
		const song = new Song();

		song.#title = json.title;
		song.#kanji_title = json.kanji_title;
		song.#song_link = json.song_link;
		song.#search_on_YT = json.search_on_YT;
		song.#single_album = json.single_album;
		song.#year = json.year;
		song.#check = json.check;

		return song;
	}

	toString() {
		return `Song: {${fieldNamesConversion.title}:${this.#title}, ${fieldNamesConversion.kanji_title}:${this.#kanji_title}, ${fieldNamesConversion.song_link}:${this.#song_link}, ${fieldNamesConversion.search_on_YT}:${this.#search_on_YT}, ${fieldNamesConversion.single_album}:${this.#single_album}, ${fieldNamesConversion.year}:${this.#year}, ${fieldNamesConversion.check}:${this.#check}}`;
	}

}

const fieldNamesConversion = {
	title: "Title",
	kanji_title: "Kanji Title",
	song_link: "Song",
	search_on_YT: "Search on YT",
	single_album: "Single/Album",
	year: "Year",
	check: "Check"
};