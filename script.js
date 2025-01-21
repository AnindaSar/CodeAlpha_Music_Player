const tracks = [
    {
        title: "Clasical Music",
        artist: "Ustaad",
        src: "audio1.mp3" 
    },
    {
        title: "Bengali Music",
        artist: "Archi",
        src: "audio2.mp3" 
    },
    {
        title: "Hip Hop",
        artist: "Ray",
        src: "audio3.mp3" 
    }
];

let currentTrackIndex = 0; 
const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const progress = document.getElementById('progress');


function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.src;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
}


function playTrack() {
    audio.play();
    playButton.textContent = 'Pause';
}


function pauseTrack() {
    audio.pause();
    playButton.textContent = 'Play';
}


playButton.addEventListener('click', () => {
    if (audio.paused) {
        playTrack();
    } else {
        pauseTrack();
    }
});

prevButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    playTrack();
});

nextButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    playTrack();
});

// Update progress bar as the track plays
audio.addEventListener('timeupdate', () => {
    const progressValue = (audio.currentTime / audio.duration) * 100;
    progress.value = progressValue;
});


progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});


loadTrack(currentTrackIndex);


audio.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    playTrack();
});


document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case ' ':
            event.preventDefault();
            if (audio.paused) {
                playTrack();
            } else {
                pauseTrack();
            }
            break;
        case 'ArrowLeft':
            prevButton.click();
            break;
        case 'ArrowRight':
            nextButton.click();
            break;
    }
});