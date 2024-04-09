import { Authentication } from "../../model/authentication/Authentication.js";
import { UserDAO } from "../../model/database/db_DAOs/userDAO.js";
import { User } from "../../model/domain/user/User.js";
import { SESSION_STORAGE_KEYS } from "../../model/constants/storageConstants.js";


const mAuthentication = new Authentication();
const mUserDAO = new UserDAO();

const usernameTextField = document.getElementById("registration-field-username");
const emailTextField = document.getElementById("registration-field-email");
const passwordTextField = document.getElementById("registration-field-password");
const confirmPasswordTextField = document.getElementById("registration-field-password-confirm");

const registrationButton = document.getElementById("registration-button");


function registerUser() {
	const username = usernameTextField.value;
	const email = emailTextField.value;
	const password = passwordTextField.value;

	if (!checkFields()) {
		alert("Please fill all the fields correctly");
		return;
	}

	mAuthentication.register(email, password)
		.then((userId) => {
			const userObj = new User(username, email, password);
			mUserDAO.saveUser(userObj, userId)
				.then(() => {
					sessionStorage.setItem(SESSION_STORAGE_KEYS.CURRENT_USER, JSON.stringify(userObj));
				});
		})
		.catch((error) => {
			console.error("Error registering user:", error);
		});
}

function checkFields() {
	if (usernameTextField.value === "" || emailTextField.value === "" || passwordTextField.value === "" || confirmPasswordTextField.value === "") {
		return false;
	}
	else if (passwordTextField.value !== confirmPasswordTextField.value) {
		return false;
	}
	else {
		return true;
	}
}

registrationButton.addEventListener("click", registerUser);

