document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('bgMusic');
    const toggleBtn = document.getElementById('musicToggle');
    let isPlaying = false;

    function toggleMusic() {
        if (!isPlaying) {
            music.play()
                .then(() => {
                    isPlaying = true;
                    toggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                })
                .catch(error => {
                    console.error("Playback failed:", error);
                });
        } else {
            music.muted = !music.muted;
            toggleBtn.classList.toggle('muted', music.muted);
            toggleBtn.innerHTML = music.muted 
                ? '<i class="fas fa-volume-mute"></i>' 
                : '<i class="fas fa-volume-up"></i>';
        }
    }

    function handleInteraction(e) {
        e.preventDefault();
        toggleMusic();
        
        // Add pulse animation
        toggleBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            toggleBtn.style.transform = 'scale(1)';
        }, 100);
    }

    toggleBtn.addEventListener('click', handleInteraction);
    toggleBtn.addEventListener('touchstart', handleInteraction, { passive: false });
});