import { Authentication } from "../../model/authentication/Authentication.js";
import { UserDAO } from "../../model/database/db_DAOs/userDAO.js";
import { User } from "../../model/domain/user/User.js";
import { BASE_URL, updateCurrentUser } from "../../main.js";


const mAuthentication = new Authentication();
const mUserDAO = new UserDAO();

const usernameTextField = document.getElementById("registration-field-username");
const emailTextField = document.getElementById("registration-field-email");
const passwordTextField = document.getElementById("registration-field-password");
const confirmPasswordTextField = document.getElementById("registration-field-password-confirm");

const registrationButton = document.getElementById("registration-button");

const loginButton = document.getElementById("login-button");
loginButton.parentElement.href = `${BASE_URL}/`;


async function registerUser() {
    const username = usernameTextField.value;
    const email = emailTextField.value;
    const password = passwordTextField.value;

    if (!checkFields()) {
        alert("Please fill all the fields correctly");
        return;
    }

    try {
        const userId = await mAuthentication.register(email, password);

        const userObj = new User(username, email, password);
        userObj.userId = userId;
        await mUserDAO.saveUser(userObj, userId);

        updateCurrentUser(userObj);

        window.location.assign(`${BASE_URL}/src/view/artistSelection.html`);
    }
	catch (error) {
	    alert("Error registering user. Maybe an account with this email already exists.");		
        console.error("Error registering user:", error);
    }
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

