const wrapper = document.querySelector(".wrapper");
const musicImg = wrapper.querySelector(".img-area img");
const musicName = wrapper.querySelector(".song-details .name");
const musicArtist = wrapper.querySelector(".song-details .artist");
const progressArea = wrapper.querySelector(".progress-area");
const mainAudio = wrapper.querySelector("#main-audio");
const prevBtn = wrapper.querySelector("#prev");
const playPauseBtn = wrapper.querySelector(".play-pause");
const nextBtn = wrapper.querySelector("#next");
const moreMusic = wrapper.querySelector("#more-music");
const musicList = wrapper.querySelector(".music-list");
const closeMusic = wrapper.querySelector("#close");
const progressBar = wrapper.querySelector("progress-bar");

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1 );
let isMusicPaused = true;

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
    playingSong();
});

function loadMusic(index){
    musicName.innerText = allMusic[index - 1].name;
    musicArtist.innerText = allMusic[index - 1].artist;
    musicImg.src = `images/${allMusic[index - 1].src}.jpg`;
    mainAudio.src = `songs/${allMusic[index - 1].src}.mp3`;
}

function playSong(){
    mainAudio.play();
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
}

function pauseMusic(){
    mainAudio.pause();
    wrapper.classList.remove("play");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
}

function prevMusic(){
    //decrement index
    //if current index is firstone then setting index to the last music in the array of objects.
    //load music
    //playmusic
    //make it current playing music
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length: musicIndex = musicIndex;
    loadMusic(musicIndex);
    playSong();
    playingSong();
}

function nextMusic(){
    musicIndex++;
    musicIndex > 1 ? musicIndex = 1: musicIndex = musicIndex;
    loadMusic(musicIndex);
    playSong();
    playingSong();
}

