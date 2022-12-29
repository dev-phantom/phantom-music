const musicContainer = document.getElementById('music-container');
const musicInfo = document.getElementById('music-info');
const playBtn = document.getElementById('play');
const playlistBtn = document.getElementById('playlist');
let playlistItems = document.getElementById('playlist-item');
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
const timeInfo = document.querySelector('#time-info')
const playlistItem = document.querySelector('#playlist-items');


let test = true;
let timeOut
function millsTomin(mills) {
  let min = Math.floor(mills / 60000)
  let sec = ((mills % 60000) / 1000 ).toFixed(0)
  return (
    sec == 60 ? 
    (min + 1) + ":00" :
    min + ":" +(sec < 10 ? "0" : "") + sec
  )

}
let sol = millsTomin(900000)
function fifteen() {
  test = true

  document.querySelector('#timer-info').style.display = "none";
  timeInfo.innerText = "the music will off in the next 15mins"

  let timerOut = setTimeout(function(){
    timeInfo.style.display = "none"
  },5000)

  timeOut = setTimeout(function(){
    pauseSong()
  },900000)
}
function thirty() {
  test = true

  document.querySelector('#timer-info').style.display = "none";
  timeInfo.innerText = "the music will off in the next 30mins"

  let timerOut = setTimeout(function(){
    timeInfo.style.display = "none"
  },5000)

  timeOut = setTimeout(function(){
    pauseSong()
  },1800000)
}
function fourty(timeOut) {
  test = true

  document.querySelector('#timer-info').style.display = "none";
  timeInfo.innerText = "the music will off in the next 45mins"

  let timerOut = setTimeout(function(){
    timeInfo.style.display = "none"
  },5000)

  timeOut = setTimeout(function(){
    pauseSong()
  },240000)
}
function off() {
    document.querySelector('#timer-info').style.display = "none";

  timeInfo.innerText = "the timer has stopped"

  clearInterval(timeOut)
  test = false
}
// Song titles
const songs = [
    'Lie - kizz daniel',
    'Ayra star - bloody Samaritan',
    'CKay - love nwantiti',
    'Ayra starr - away'
];

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  cover.style.animationPlayState = "running";

  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  cover.style.animationPlayState = "paused";
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  audio.pause();
}

//timer
$('#timer').click(function(){
  $('#timer-info').toggle()
})
//playlist
$('#playlist').click(function(){
  $('#playlist-items').toggle()
})

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

// functions for each song

function lie() {
  loadSong(songs[0]);
  playSong();

  playlistItem.style.display =  "none"
  
}
function bloody() {
  loadSong(songs[1]);
  playSong();

  playlistItem.style.display =  "none"
  
}
function love() {
  loadSong(songs[2]);
  playSong();

  playlistItem.style.display =  "none"
  
}
function away() {
  loadSong(songs[3]);
  playSong();

  playlistItem.style.display =  "none"
  
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
// timerBtn.addEventListener('click', Timer);
// playlists
playlistBtn.addEventListener('click', playlist);
//shuffle song
shuffleBtn.addEventListener('click', shuffleSong);
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
audio.addEventListener('ended', nextSong,);

// Time of song

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
                    output.innerHTML = "<b>Text:</b> " + transcript + "";
                   
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
