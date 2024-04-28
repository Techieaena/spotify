console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let playButtons = document.querySelectorAll('.songItemPlay');
let timestamp = document.querySelectorAll('.timestamp');
let resetmyProgressBar = document.getElementById('resetmyProgressBar');

let songs = [
    { songName: "Kabira", filePath: "songs/1.mp3", coverPath: "covers/image1.jpg" },
    { songName: "Waqt ki Baatein", filePath: "songs/2.mp3", coverPath: "covers/image2.jpg" },
    { songName: "Soulmate", filePath: "songs/3.mp3", coverPath: "covers/image3.jpg" },
    { songName: "Saware", filePath: "songs/4.mp3", coverPath: "covers/image4.jpg" },
    { songName: "Choo lo", filePath: "songs/5.mp3", coverPath: "covers/image5.jpg" },
];

// Function to play a specific song
const playSong = (index) => {
    if (index < 0 || index >= songs.length) {
        return;
    }
    // Stop the currently playing song
    stopCurrentSong();
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 0;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
};

// Function to stop the currently playing song
const stopCurrentSong = () => {
    audioElement.pause();
    audioElement.currentTime = 0;
    playButtons.forEach(button => {
        button.classList.remove('fa-pause');
        button.classList.add('fa-play');
    });
};

// Function to toggle play/pause icon
const togglePlayIcon = (button) => {
    button.classList.toggle('fa-play');
    button.classList.toggle('fa-pause');
};

// Function to toggle text visibility based on song playback
const toggleTextVisibility = (isVisible) => {
    if (isVisible) {
        masterSongName.style.opacity = 1;
    } else {
        masterSongName.style.opacity = 0;
    }
};

// Add click event listener to each play button
playButtons.forEach(button => {
    button.addEventListener('click', () => {
        let currentIndex = songIndex;
        let nextIndex = parseInt(button.id);
        if (currentIndex !== nextIndex) {
            stopCurrentSong();
            playSong(nextIndex);
        } else {
            togglePlayIcon(button);
            if (audioElement.paused) {
                audioElement.play();
            } else {
                audioElement.pause();
            }
        }
    });
});

// Function to play/pause the audio
const togglePlay = () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong(songIndex);
    } else {
        stopCurrentSong();
    }
}

// Handle play/pause click on bottom button
masterPlay.addEventListener('click', togglePlay);

// Listen to audio play/pause events
audioElement.addEventListener('play', () => {
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity = 1;
    playButtons[songIndex].classList.remove('fa-play');
    playButtons[songIndex].classList.add('fa-pause');
});

audioElement.addEventListener('pause', () => {
    masterPlay.classList.remove('fa-pause');
    masterPlay.classList.add('fa-play');
    gif.style.opacity = 0;
    playButtons[songIndex].classList.remove('fa-pause');
    playButtons[songIndex].classList.add('fa-play');
});

// Listen to next button click
document.getElementById('next').addEventListener('click', () => {
    let currentIndex = songIndex;
    let nextIndex = (currentIndex + 1) % songs.length;
    stopCurrentSong();
    playSong(nextIndex);

});

// Listen to previous button click
document.getElementById('previous').addEventListener('click', () => {
    let currentIndex = songIndex;
    let prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    stopCurrentSong();
    playSong(prevIndex);

});

// Listen to audio time update
audioElement.addEventListener('timeupdate', () => {
    updateTimestamp();
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;

});

// Listen to progress bar change
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});


