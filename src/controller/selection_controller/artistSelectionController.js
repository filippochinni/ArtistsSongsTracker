import { mCurrentUser as mmCurrentUser } from "../../main.js";


const mCurrentUser = mmCurrentUser;
const isAdmin = mCurrentUser.admin;

const newArtistButton = document.getElementById("new-artist-button");


function init_ArtistSelectionPage() {
	if (isAdmin) {
		newArtistButton.disabled = false;
	}
}

init_ArtistSelectionPage();
