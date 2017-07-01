(function (window) {
  var videoPlayer = document.querySelector('.player');
  var videoViewer = videoPlayer.querySelector('.viewer');
  var progress = videoPlayer.querySelector('.progress');
  var progressBar = videoPlayer.querySelector('.progress__filled');
  var toggleButton = videoPlayer.querySelector('.toggle');
  var sliders = videoPlayer.getElementsByClassName('player__slider');
  var skipButtons = videoPlayer.getElementsByClassName('player__button--skip');
  var fullscreen = videoPlayer.querySelector('.player__button--fullscreen');
  var isVideoPlayed = false;

  // It's for mapping dom elements. The Array.prototype.forEach won't work
  // with NodeList.
  function forEach(callback) {
    for (var i = 0; i < this.length; i++) {
      callback.call(this, this[i], i);
    }
  }

  function playPauseToggle() {
    var method = videoViewer.paused ? 'play' : 'pause';
    videoViewer[method]();
  }

  function handleRangeUpdate() {
    // Either 'volume' or 'playbackRate'
    // Here https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
    videoViewer[this.name] = this.value;
  }

  function progressBarOnPlaying() {
    var currentProgressBar = parseFloat(this.currentTime / this.duration) * 100;
    progressBar.style.flexBasis = `${currentProgressBar}%`;
  }

  function togglePlayPauseButton() {
    var button = videoViewer.paused ? '▷' : '▯▯';
    toggleButton.textContent = button;
  }

  function skipTheVideo() {
    videoViewer.currentTime += parseInt(this.dataset.skip);
  }

  function scrubTime(event) {
    var time = (event.offsetX / this.offsetWidth) * videoViewer.duration;
    var method = videoViewer.paused ? 'paused' : 'play';
    videoViewer.currentTime = time;
  }

  function toggleFullscreen() {
    if (videoViewer.requestFullScreen){
      videoViewer.requestFullScreen();
    } else if(videoViewer.webkitRequestFullScreen){
      videoViewer.webkitRequestFullScreen();
    } else if(videoViewer.mozRequestFullScreen){
      videoViewer.mozRequestFullScreen();
    }
  }

  // Video viewer you watch the video from. Play and pause as you like.
  videoViewer.addEventListener('click', playPauseToggle);
  videoViewer.addEventListener('click', togglePlayPauseButton);
  videoViewer.addEventListener('timeupdate', progressBarOnPlaying);

  toggleButton.addEventListener('click', playPauseToggle);
  toggleButton.addEventListener('click', togglePlayPauseButton);

  // Moving colored bar informs users that the video is playing.
  // You can play the video back and forth by clicking and moving
  // the mouse on progress bar.
  progress.addEventListener('click', scrubTime);
  progress.addEventListener('mousemove', function () {
    if (!isVideoPlayed) {
      return;
    }

    scrubTime.call(this, event);
  });
  progress.addEventListener('mousedown', function () {
    isVideoPlayed = true;
  });
  progress.addEventListener('mouseup', function () {
    isVideoPlayed = false;
  });

  // Sliders for controlling volume and playback rate (faster or slower).
  forEach.call(sliders, function (slider) {
    slider.addEventListener('mousemove', handleRangeUpdate);
    slider.addEventListener('change', handleRangeUpdate);
  });

  // Buttons for skipping the video back and forth.
  forEach.call(skipButtons, function (skipButton) {
    skipButton.addEventListener('click', skipTheVideo);
  });

  // Watch the video fullscreen (take up the whole screen).
  fullscreen.addEventListener('click', toggleFullscreen);
})(window);
