import { Authentication } from "../../model/authentication/Authentication.js";
import { UserDAO } from "../../model/database/db_DAOs/userDAO.js";
import { User } from "../../model/domain/user/User.js";
import { SESSION_STORAGE_KEYS } from "../../model/constants/storageConstants.js";


const mAuthentication = new Authentication();
const mUserDAO = new UserDAO();

const emailTextField = document.getElementById("login-field-email");
const passwordTextField = document.getElementById("login-field-password");

const loginButton = document.getElementById("login-button");


function loginUser() {
	const email = emailTextField.value;
	const password = passwordTextField.value;

	if (!checkFields()) {
		alert("Please fill all the fields");
		return;
	}

	mAuthentication.login(email, password)
		.then((userId) => {
			mUserDAO.getUser(userId)
				.then((user) => {
					console.log("User logged in: ", JSON.stringify(user));
					sessionStorage.setItem(SESSION_STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));

					window.location.assign("/ArtistsSongsTracker/src/view/artistSelection.html");
				});
		})
		.catch((error) => {
			console.error("Error logging in user:", error);
		});
}

function checkFields() {
	if (emailTextField.value === "" || passwordTextField.value === "") {
		return false;
	}
	else {
		return true;
	}
}


loginButton.addEventListener("click", loginUser);