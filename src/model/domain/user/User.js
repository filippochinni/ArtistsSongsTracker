import { Tracker } from '../business/Tracker.js';


export class User {
	#userId;
	#admin;
	#username;
	#email;
	#password;
	#trackerList;

	constructor(username, email, password) {
		this.#username = username;
		this.#email = email;
		this.#password = password;

		this.#admin = false;

		this.#trackerList = [];
	}

	get userId() {
		return this.#userId;
	}

	set userId(value) {
		this.#userId = value;
	}

	get admin() {
		return this.#admin;
	}

	set admin(value) {
		this.#admin = value;
	}

	get username() {
		return this.#username;
	}

	set username(value) {
		this.#username = value;
	}

	get email() {
		return this.#email;
	}

	set email(value) {
		this.#email = value;
	}

	get password() {
		return this.#password;
	}

	set password(value) {
		this.#password = value;
	}

	get trackerList() {
		return this.#trackerList;
	}

	set trackerList(value) {
		this.#trackerList = value;
	}

	toJSON() {
		if (this.#userId) {
			return {
				userId: this.#userId,
				admin: this.#admin,
				username: this.#username,
				email: this.#email,
				password: this.#password,
				trackerList: this.#trackerList.map((tracker) => tracker.toJSON())
			};
		}
		else {
			return {
				admin: this.#admin,
				username: this.#username,
				email: this.#email,
				password: this.#password,
				trackerList: this.#trackerList.map((tracker) => tracker.toJSON())
			};
		}
	}

	static fromJSON(json, userId) {
		const user = new User();

		user.#userId = userId ? userId : json.userId;

		user.#admin = json.admin;
		user.#username = json.username;
		user.#email = json.email;
		user.#password = json.password;
		user.#trackerList = json.trackerList.map((tracker) => Tracker.fromJSON(tracker, tracker.trackerId));

		return user;
	}

	toString() {
		return `User: {${this.#userId}, ${this.#admin}, ${this.#username}, ${this.#email}, ${this.#password}, ${this.#trackerList}}`;
	}

	checkTrackerExists(trackerId) {
		return this.#trackerList.some((tracker) => tracker.trackerId === trackerId);
	}

	addTracker(tracker) {
		this.#trackerList.push(tracker);
	}

}