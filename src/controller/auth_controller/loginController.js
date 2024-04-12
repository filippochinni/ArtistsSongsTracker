import { Authentication } from "../../model/authentication/Authentication.js";
import { UserDAO } from "../../model/database/db_DAOs/userDAO.js";
import { BASE_URL, updateCurrentUser } from "../../main.js";


const mAuthentication = new Authentication();
const mUserDAO = new UserDAO();

const emailTextField = document.getElementById("login-field-email");
const passwordTextField = document.getElementById("login-field-password");

const loginButton = document.getElementById("login-button");


async function loginUser() {
    const email = emailTextField.value;
    const password = passwordTextField.value;

    if (!checkFields()) {
        alert("Please fill all the fields");
        return;
    }

    try {
        const userId = await mAuthentication.login(email, password);
        const user = await mUserDAO.getUser(userId);
        
        console.log("User logged in: ", JSON.stringify(user)); //LOG

        updateCurrentUser(user);

        window.location.assign(`${BASE_URL}/src/view/artistSelection.html`);
    }
	catch (error) {
		alert("Error logging in user. Please check your credentials and try again.");
        console.error("Error logging in user:", error);
    }
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