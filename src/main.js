import { initializeFirebase } from './model/database/firebaseConnection.js';
import { UserDAO } from './model/database/db_DAOs/UserDAO.js';

async function init() {
	await initializeFirebase();

	// let userDAO = new UserDAO();
	// await userDAO.prova();
	// await userDAO.provaGet();
}

init();