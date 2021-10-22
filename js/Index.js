const musicContainer = document.getElementById('music-container');
const musicInfo = document.getElementById('music-info');
const playBtn = document.getElementById('play');
const playlistBtn = document.getElementById('playlist');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const muteBtn = document.getElementById('mute');
const shuffleBtn = document.getElementById('shuffle');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Song titles
const songs = [
    'Lie - kizz daniel',
    'Ayra star - bloody Samaritan',
    'CKay - love nwantiti',
    'Ayra starr - away'
    
];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `musics/${song}.mp3`;
  cover.src = `musics-images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  audio.pause();
}
//playlist
function playlist() {
  document.getElementById("playlists").innerHTML = song;
}
// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}
//mute song
function muteSong() {
    musicContainer.classList.add('mute');
  muteBtn.querySelector('i.fas').classList.remove('fa-volume-mute');
  muteBtn.querySelector('i.fas').classList.add('fa-volume-up');
  
 audio.muted = true;
}
//unmute song
function unmuteSong() {
    musicContainer.classList.remove('mute');
  muteBtn.querySelector('i.fas').classList.remove('fa-volume-up');
  muteBtn.querySelector('i.fas').classList.add('fa-volume-mute');
   audio.muted = false;
}
//shuffle song
function shuffleSong(){
Math.floor(Math.random(songs) * songIndex);
songIndex = Math.floor(Math.random() * 4);

  loadSong(songs[songIndex]);

  playSong();
}
// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}


// Event listeners play and pause
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
// Event listeners for mute and unmute
muteBtn.addEventListener('click', () => {
  const isMute = musicContainer.classList.contains('mute');

  if (isMute) {
    unmuteSong();
  } else {
    muteSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
// shuffle song
shuffleBtn.addEventListener('click',shuffleSong);
//playlist songs
playlistBtn.addEventListener('click',playlist);
// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate',DurTime);
function runSpeechRecognition() {
    let songvoice =  [
    'Lie',
    ' bloody Samaritan',
    'CKay',
    'away'
];

		        // get output div reference
		        var output = document.getElementById("output");
		        // get action element reference

		        var action = document.getElementById("action");
                // new speech recognition object
                var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
                var recognition = new SpeechRecognition();
            
                // This runs when the speech recognition service starts
                recognition.onstart = function() {
                    action.innerHTML = "<small>listening, please speak...</small>";
                };
                
                recognition.onspeechend = function() {
                    action.innerHTML = "<small>stopped listening, hope you are done...</small>";
                    recognition.stop();
                }
              
                // This runs when the speech recognition service returns result
                recognition.onresult = function(event) {
                    var transcript = event.results[0][0].transcript;
                    var confidence = event.results[0][0].confidence;
                    output.innerHTML = "<b>Text:</b> " + transcript + "<br/> <b>Strength:</b> " + confidence*100+"%";
                    output.classList.remove("hide");
                                        if (transcript == "play" || transcript == "play song") {
                     return playSong();
                    }
                    else if (transcript == "pause" || transcript == "pause song") {
                    return pauseSong()
                    }
                    else if (transcript == "next" || transcript == "next song") {
                    return nextSong()
                    }
                    else if (transcript == "previous" || transcript == "previous song") {
                    return prevSong()
                    }
                    else if (transcript == "mute" || transcript == "mute song") {
                    return muteSong()
                    }
                    else if (transcript == "unmute" || transcript == "unmute song") {
                    return unmuteSong()
                    }
                    else if (transcript == "shuffle" || transcript == "shuffle song") {
                    return shuffleSong()
                    }
                    else{
                      return pauseSong();
                    }
                };
                
                 // start recognition
                 recognition.start();
	        }
