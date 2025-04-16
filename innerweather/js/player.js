var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var currentTrackIndex = 0;
var playlist = [];
var trackTitles = [];
var adPlaying = false;

document.getElementById('togglePlayer').addEventListener('click', () => {
  document.getElementById('musicWrapper').classList.toggle('hidden');
});

function updateProgressBar() {
  if (player && player.getCurrentTime && player.getDuration) {
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();
    const progressPercent = (currentTime / duration) * 100;
    document.getElementById('progress').style.width = `${progressPercent}%`;
    document.querySelector('.time-display').textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
  }
  requestAnimationFrame(updateProgressBar);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '1',
    width: '1',
    playerVars: {
      listType: 'playlist',
      list: 'PLbpytgpi11Wr4n7c8NyV6PaHtdhJzdRIi',
      autoplay: 0,
      controls: 0,
      rel: 0,
      iv_load_policy: 3
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
      'onError': onPlayerError,
      'onAdStateChange': onAdStateChange  
    }
  });
}

function onPlayerReady() {
  document.getElementById('vinyl').addEventListener('click', togglePlayPause);
  document.getElementById('play-pause-button').addEventListener('click', togglePlayPause);
  document.getElementById('prev-button').addEventListener('click', playPreviousTrack);
  document.getElementById('next-button').addEventListener('click', playNextTrack);
  document.getElementById('volume-down').addEventListener('click', () => {
    const vol = player.getVolume();
    player.setVolume(Math.max(vol - 10, 0));
  });
  document.getElementById('volume-up').addEventListener('click', () => {
    const vol = player.getVolume();
    player.setVolume(Math.min(vol + 10, 100));
  });
  document.querySelector('.progress-container').addEventListener('click', e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    const time = player.getDuration() * percent;
    player.seekTo(time);
  });

  loadPlaylistDetails();
  updateProgressBar();

  setupAdDetection();
}

function setupAdDetection() {

  setInterval(checkForAds, 1000);
}

function checkForAds() {
  if (player && player.getVideoData) {
    try {

      const videoData = player.getVideoData();

      if (playlist.length > 0 && !playlist.includes(videoData.video_id)) {
        console.log("Ad detected, attempting to skip...");
        handleAdDetected();
      }

      const playerElement = document.getElementById('player');
      if (playerElement && playerElement.contentWindow) {
        const adElements = playerElement.contentWindow.document.querySelectorAll('.ytp-ad-module');
        if (adElements && adElements.length > 0) {
          console.log("Ad overlay detected, attempting to skip...");
          handleAdDetected();
        }
      }
    } catch (e) {
      console.log("Error checking for ads:", e);
    }
  }
}

function handleAdDetected() {

  if (player.getDuration) {
    const duration = player.getDuration();
    if (duration) {
      player.seekTo(duration - 0.1);
    }
  }

  player.nextVideo();

  player.mute();

  adPlaying = true;
}

function onAdStateChange(event) {

  if (event.data === YT.PlayerState.PLAYING) {
    console.log("Ad playing, attempting to skip...");
    handleAdDetected();
  } else if (event.data === YT.PlayerState.ENDED) {

    if (adPlaying) {
      player.unMute();
      adPlaying = false;
    }
  }
}

function onPlayerError(event) {
  console.log("Player error:", event.data);

  playNextTrack();
}

function loadPlaylistDetails() {
  setTimeout(() => {
    if (player && player.getPlaylist) {
      playlist = player.getPlaylist();
      playlist.forEach((videoId, i) => {
        trackTitles[i] = `Track ${i + 1}`;
      });
      updateTrackInfo(0);
    } else {
      loadPlaylistDetails();
    }
  }, 1000);
}

function onPlayerStateChange(event) {
  if (event.data === 1) {
    document.getElementById('vinyl').classList.add('spinning');
    document.getElementById('play-pause-button').innerHTML = '<i class="fas fa-pause"></i>';
    currentTrackIndex = player.getPlaylistIndex();
    updateTrackInfo(currentTrackIndex);

    if (adPlaying) {
      player.unMute();
      adPlaying = false;
    }
  } else if (event.data === 2) {
    document.getElementById('vinyl').classList.remove('spinning');
    document.getElementById('play-pause-button').innerHTML = '<i class="fas fa-play"></i>';
  } else if (event.data === 0) {
    playNextTrack();
  }

  checkAdInfoInPlayerState(event);
}

function checkAdInfoInPlayerState(event) {

  if (player.getVideoData && player.getVideoUrl) {
    const videoData = player.getVideoData();
    const videoUrl = player.getVideoUrl();

    if (videoData.title && 
        (videoData.title.toLowerCase().includes('ad') || 
         videoData.title.toLowerCase().includes('advertisement') ||
         videoData.title.toLowerCase().includes('sponsor'))) {
      console.log("Likely ad content detected in title, attempting to skip");
      handleAdDetected();
    }

    if (videoUrl && videoUrl.includes('ad_')) {
      console.log("Ad parameter detected in URL, attempting to skip");
      handleAdDetected();
    }
  }
}

function updateTrackInfo(index) {
  const videoTitle = player.getVideoData().title || trackTitles[index];
  trackTitles[index] = videoTitle;
  document.getElementById('track-info').textContent = videoTitle;
}

function togglePlayPause() {
  if (player.getPlayerState() === 1) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
}

function playNextTrack() {
  player.nextVideo();
}

function playPreviousTrack() {
  player.previousVideo();
}