 // YouTube API
 var tag = document.createElement('script');
 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

 var player;
 var currentTrackIndex = 0;
 var playlist = [];
 var trackTitles = [];

 // Toggle button
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
       'onStateChange': onPlayerStateChange
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
   } else if (event.data === 2) {
     document.getElementById('vinyl').classList.remove('spinning');
     document.getElementById('play-pause-button').innerHTML = '<i class="fas fa-play"></i>';
   } else if (event.data === 0) {
     playNextTrack();
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