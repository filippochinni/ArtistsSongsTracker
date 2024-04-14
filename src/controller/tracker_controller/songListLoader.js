import { Song, fieldNamesConversion as songFieldNamesConversion } from "../../model/domain/business/Song.js";
import { trackerStatusStrings } from "../../controller/tracker_controller/searchHandler.js";
import { updateTrackStatus } from "../../controller/tracker_controller/songTrackerController.js";


const searchButtonPath = `../../../res/icons/searchButtonIcon.png`;
const youtubeIconPath = `../../../res/icons/youtubeIcon.svg`;

const trackUpdateButtonText = `Change Status`;

const outputDiv = document.getElementById("output-div");


function loadSongsList(songsArray) {
	outputDiv.innerHTML = "";

    for(const song of songsArray) {
        const songDiv = createSongBox(song);
        outputDiv.appendChild(songDiv);
    }
}

function createSongBox(song) {
    const songDiv = document.createElement("div");
    songDiv.classList.add("song-div");
    assignSongDivClass(songDiv, song.check);

    const songNameP = createSongNameP(song.title);
    const songInfoDiv = createSongInfoDiv(song);
    const trackUpdateButtonP = createTrackUpdateButtonP(song);

    songDiv.appendChild(songNameP);
    songDiv.appendChild(songInfoDiv);
    songDiv.appendChild(trackUpdateButtonP);

    return songDiv;
}

function assignSongDivClass(songDiv, trackStatus) {
    switch(trackStatus) {
        case 0:
            songDiv.classList.add("status-unheard");
            break;
        case 1:
            songDiv.classList.add("status-heard");
            break;
        case 2:
            songDiv.classList.add("status-playlist");
            break;
        default:
            console.error("Errore Impossibile") //LOG (impossibile)
    }
}

function createSongNameP(songName) {
    const songNameP = document.createElement("p");
    songNameP.classList.add("song-name-p");

    songNameP.textContent = songName;
    
    return songNameP;
}

function createSongInfoDiv(song) {
    const songInfoDiv = document.createElement("div");
    songInfoDiv.classList.add("song-info-div");
    
    const kanjiTitleP = document.createElement("p");
    kanjiTitleP.classList.add("song-info-element");
    kanjiTitleP.innerHTML = `${songFieldNamesConversion.kanji_title}: <span>${song.kanji_title}</span>`;

    const albumP = document.createElement("p");
    albumP.classList.add("song-info-element");
    albumP.innerHTML = `${songFieldNamesConversion.single_album}: <span>${song.single_album}</span>`;


    const songLinkP = document.createElement("p");
    songLinkP.classList.add("song-info-element");
    songLinkP.textContent = `${songFieldNamesConversion.song_link} Youtube Link: `;

    const songLinkLinkElement = document.createElement("a");
    songLinkLinkElement.href = song.song_link;
    songLinkLinkElement.target = "_blank";
    songLinkLinkElement.rel = "noopener noreferrer";
    //tempLinkElement1.textContent = "Song Youtube Link";
    songLinkLinkElement.innerHTML = `<span><img src=${youtubeIconPath} class="yt"></span>`;
    songLinkP.appendChild(songLinkLinkElement);


    const SearchYTP = document.createElement("p");
    SearchYTP.classList.add("song-info-element");
    SearchYTP.textContent = `${songFieldNamesConversion.search_on_YT}: `;

    const searchYoutubeLinkElement = document.createElement("a");
    searchYoutubeLinkElement.href = song.search_on_YT;
    searchYoutubeLinkElement.target = "_blank";
    searchYoutubeLinkElement.rel = "noopener noreferrer";
    //tempLinkElement2.textContent = "Song Search Link";
    searchYoutubeLinkElement.innerHTML = `<img src=${searchButtonPath}>`;
    SearchYTP.appendChild(searchYoutubeLinkElement);


    const yearP = document.createElement("p");
    yearP.classList.add("song-info-element");
    yearP.innerHTML = `${songFieldNamesConversion.year}: <span>${song.year}</span>`;

    const trackStatusP = document.createElement("p");
    trackStatusP.classList.add("song-info-element");
    trackStatusP.innerHTML = `Status: <span class="check-status">${trackerStatusStrings[song.check]}</span>`;

    songInfoDiv.appendChild(kanjiTitleP);
    songInfoDiv.appendChild(albumP);
    songInfoDiv.appendChild(songLinkP);
    songInfoDiv.appendChild(SearchYTP);
    songInfoDiv.appendChild(yearP);
    songInfoDiv.appendChild(trackStatusP);

    return songInfoDiv;
}

function createTrackUpdateButtonP(song) {
    const trackUpdateButtonP = document.createElement("p");
    trackUpdateButtonP.classList.add("track-update-button-p");

    const trackUpdateButton = document.createElement("button");
    trackUpdateButton.classList.add("track-update-button");
    trackUpdateButton.textContent = trackUpdateButtonText;

    trackUpdateButton.addEventListener("click", () => { updateTrackStatus(song) });

    trackUpdateButtonP.appendChild(trackUpdateButton);

    return trackUpdateButtonP;
}


export { loadSongsList };