const wrapper = document.querySelector(".wrapper");
const musicImg = wrapper.querySelector(".img-area img");
const musicName = wrapper.querySelector(".song-details .name");
const musicArtist = wrapper.querySelector(".song-details .artist");
const prevBtn = wrapper.querySelector("#prev");
const playPauseBtn = wrapper.querySelector(".play-pause");
const nextBtn = wrapper.querySelector("#next");
const moreMusicBtn = wrapper.querySelector("#more-music");
const musicList = wrapper.querySelector(".music-list");
const closeMusicBtn = wrapper.querySelector("#close");

//Progress Area elements
const progressBar = wrapper.querySelector(".progress-bar");
const progressArea = wrapper.querySelector(".progress-area");
const mainAudio = wrapper.querySelector("#main-audio");
const musicCurrentTime = wrapper.querySelector(".current-time");
const musicMaxDuration = wrapper.querySelector(".max-duration");


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
    musicIndex > musicIndex.length ? musicIndex = 1: musicIndex = musicIndex;
    loadMusic(musicIndex);
    playSong();
    playingSong();
}

playPauseBtn.addEventListener('click', ()=>{
    const isMusicPlaying = wrapper.classList.contains("paused");
    isMusicPlaying ? pauseMusic() : playSong();
    playingSong();
});

nextBtn.addEventListener('click', ()=>{
    nextMusic();
})

prevBtn.addEventListener('click', ()=> {
    prevMusic();
})

mainAudio.addEventListener('timeupdate', (e)=>{
    //Progress bar timer
    //progress width between start or begin and max duration
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
    
    //Max Duration, we need mins and secs
    //need to call mainAudio again, so while playing time duration gets updated
    mainAudio.addEventListener('loadeddata', ()=>{
        let mainAudioDuration = mainAudio.duration;
        let totalMins = Math.floor(mainAudioDuration / 60);
        let totalSecs = Math.floor(mainAudioDuration % 60);
        //if totalSecs is less then 10, need to append 0 before num
        if(totalSecs< 10){
            totalSecs = `0${totalSecs}`;
        }
        musicMaxDuration.innerText = `${totalMins}:${totalSecs}`;
    })

    //For current time, we drive totalMins and secs from current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10){
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerHTML = `${currentMin}:${currentSec}`;
})

progressArea.addEventListener("click", (e)=>{
    //For Current value of progressBar
    //We need total duration of song
    //value at which mouse clicked -- offsetX from e
    //progressBar width
    let progressWidth = progressArea.clientWidth;  //width of progress bar
    let mouseClicked = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (mouseClicked / progressWidth) * songDuration;
    playSong();
    playingSong();
}); 


const repeatBtn = wrapper.querySelector("#repeat-plist");

repeatBtn.addEventListener("click", ()=>{

    let getText = repeatBtn.innerHTML;

    switch(getText){
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback Shuffled");
            break;
        case "shuffle":
            repeatBtn.innerHTML = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            break;
    }
})

mainAudio.addEventListener("ended", ()=>{
    let getText = repeatBtn.innerText;

    switch(getText){
        case "repeat":
            nextMusic();
            break;
        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playSong();
            break;
        case "shuffle":
            let randIndex = Math.floor(Math.random() * allMusic.length) + 1;
            do{
                randIndex = Math.floor(Math.random() * allMusic.length) + 1;
            } while(musicIndex == randIndex);
            musicIndex = randIndex;
            loadMusic(musicIndex);
            playSong();
            playingSong();
            break;
    }

});

moreMusicBtn.addEventListener("click", ()=>{
    musicList.classList.toggle("show");
});

closeMusicBtn.addEventListener("click", ()=>{
    moreMusicBtn.click();
});

const ulTag = wrapper.querySelector("ul");

for (let i = 0; i < allMusic.length; i++) {

    let liTag = `
        <li li-index="${i + 1}">
            <div class="row">
                <span>${allMusic[i].name}</span>
                <p>${allMusic[i].artist}</p>
            </div>
            <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
            <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
        </li>
    `;

    ulTag.insertAdjacentHTML("beforeend", liTag);
    let liAudioDurationTag = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

    liAudioTag.addEventListener("loadeddata", () => {

        let duration = liAudioTag.duration;
        let totalMin = Math.floor(duration / 60);
        let totalSec = Math.floor(duration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }

        liAudioDurationTag.innerText = `${totalMin}:${totalSec}`;
        liAudioDurationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
    })

}
