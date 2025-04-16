document.addEventListener('DOMContentLoaded', function() {

    const playlist = [
        "../music/music-background.mp3"

    ];

    let currentTrackIndex = 0;
    let isMuted = false;
    let isPlaying = false;
    let audioContext = null;
    let audioElement = null;
    let audioSource = null;
    let gainNode = null;

    const toggleButton = document.getElementById('togglePlayer');

    function initAudio() {
        if (audioContext) return; 

        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioElement = new Audio();
        audioElement.crossOrigin = "anonymous";
        audioElement.loop = false; 

        audioSource = audioContext.createMediaElementSource(audioElement);
        gainNode = audioContext.createGain();

        audioSource.connect(gainNode);
        gainNode.connect(audioContext.destination);

        audioElement.addEventListener('ended', playNextTrack);

        loadTrack(currentTrackIndex);
        playAudio();
    }

    function loadTrack(index) {
        audioElement.src = playlist[index];
        audioElement.load();
    }

    function playAudio() {
        audioElement.play()
            .then(() => {
                isPlaying = true;
                toggleButton.classList.add('playing');
            })
            .catch(error => {
                console.error("Playback failed:", error);
            });
    }

    function playNextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
        playAudio();
    }

    function toggleMute() {
        if (!audioContext) {
            initAudio(); 
            return;
        }

        isMuted = !isMuted;
        gainNode.gain.value = isMuted ? 0 : 1;

        if (isMuted) {
            toggleButton.classList.add('muted');
            toggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            toggleButton.classList.remove('muted');
            toggleButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }

    toggleButton.addEventListener('click', toggleMute);
});