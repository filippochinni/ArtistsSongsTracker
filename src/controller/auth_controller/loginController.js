import { Authentication } from "../../model/authentication/Authentication.js";
import { UserDAO } from "../../model/database/db_DAOs/userDAO.js";
import { User } from "../../model/domain/user/User.js";


const mAuthentication = new Authentication();
const mUserDAO = new UserDAO();

const emailTextField = document.getElementById("login-field-email");
const passwordTextField = document.getElementById("login-field-password");

const loginButton = document.getElementById("login-button");


function loginUser() {
	const email = emailTextField.value;
	const password = passwordTextField.value;

	if (!checkFields()) {
		alert("Please fill all the fields correctly");
		return;
	}

	mAuthentication.login(email, password)
		.then((userId) => {
			mUserDAO.getUser(userId)
				.then((userData) => {
					const user = User.fromJSON(userData, userId);
					sessionStorage.setItem("currentUser", JSON.stringify(user));

					window.location.assign("src/view/artistSelection.html");
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