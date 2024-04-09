export class User {
	#userId;
	#username;
	#email;
	#password;
	#trackerList;

	constructor(username, email, password) {
		this.#username = username;
		this.#email = email;
		this.#password = password;

		this.#trackerList = {};
	}

	get userId() {
		return this.#userId;
	}

	set userId(value) {
		this.#userId = value;
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
		return {
			userId: this.#userId,
			username: this.#username,
			email: this.#email,
			password: this.#password,
			trackerList: this.#trackerList
		};
	}

	toJSON_special() {
		return {
			username: this.#username,
			email: this.#email,
			password: this.#password,
			trackerList: this.#trackerList
		};
	}

	static fromJSON(json, userId) {
		const user = new User();

		user.#userId = userId;

		user.#username = json.username;
		user.#email = json.email;
		user.#password = json.password;
		user.#trackerList = json.trackerList;

		return user;
	}

	toString() {
		return `User: {${this.#userId}, ${this.#username}, ${this.#email}, ${this.#password}, ${this.#trackerList}}`;
	}

}