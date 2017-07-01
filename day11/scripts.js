(function (window) {
  var videoPlayer = document.querySelector('.player');
  var videoViewer = videoPlayer.querySelector('.viewer');
  var progressBar = videoPlayer.querySelector('.progress');
  var progressBarFilled = videoPlayer.querySelector('.progress__filled');
  var playOrPauseButton = videoPlayer.querySelector('.toggle');
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
    // The element this function listens to is `.player__slider`.
    // In this case, we have either 'volume' or 'playbackRate'
    // for `this.name` value.
    //
    // Here's the markup:
    // <input type="range" name="volume" class="player__slider"> and
    // <input type="range" name="playbackRate class="player__slider">
    //
    // For more info:
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
    videoViewer[this.name] = this.value;
  }

  function progressBarOnPlaying() {
    var currentProgressBar = parseFloat(this.currentTime / this.duration) * 100;
    progressBarFilled.style.flexBasis = `${currentProgressBar}%`;
  }

  function togglePlayPauseButton() {
    var button = videoViewer.paused ? '▷' : '▯▯';
    playOrPauseButton.textContent = button;
  }

  function skipTheVideo() {
    videoViewer.currentTime += parseInt(this.dataset.skip);
  }

  // Display video at specific time as the progress bar moved or clicked.
  function scrubTime(event) {
    var time = (event.offsetX / this.offsetWidth) * videoViewer.duration;
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

  // Video viewer you watch the video from. Click the screen and
  // you see it paused or played under your control. The progress
  // bar moves in accord to video's current time, so on until its
  // duration ends. If the viewer clicked and video played, '▯▯'
  // shown and '▷' hidden. Thing goes the other way round if the
  // screen clicked and video paused.
  videoViewer.addEventListener('click', playPauseToggle);
  videoViewer.addEventListener('click', togglePlayPauseButton);
  videoViewer.addEventListener('timeupdate', progressBarOnPlaying);

  // A button dedicated to toggle video player. Play or pause the
  // video as you wish. If the button clicked and video played,
  // '▯▯' shown and '▷' hidden. Thing goes the other way round if
  // the button clicked and video paused.
  playOrPauseButton.addEventListener('click', playPauseToggle);
  playOrPauseButton.addEventListener('click', togglePlayPauseButton);

  // Moving colored bar informs users that the video is playing.
  // You can play the video back and forth by clicking or moving
  // the mouse on progress bar.
  progressBar.addEventListener('click', scrubTime);
  progressBar.addEventListener('mousemove', function () {
    if (!isVideoPlayed) {
      return;
    }

    scrubTime.call(this, event);
  });
  progressBar.addEventListener('mousedown', function () {
    isVideoPlayed = true;
  });
  progressBar.addEventListener('mouseup', function () {
    isVideoPlayed = false;
  });

  // Sliders for controlling volume (louder or softer)
  // and playback rate (faster or slower).
  forEach.call(sliders, function (slider) {
    slider.addEventListener('mousemove', handleRangeUpdate);
    slider.addEventListener('change', handleRangeUpdate);
  });

  // Buttons for skipping the video back and forth.
  forEach.call(skipButtons, function (skipButton) {
    skipButton.addEventListener('click', skipTheVideo);
  });

  // Watch the video fullscreen (it's taking up the whole screen).
  fullscreen.addEventListener('click', toggleFullscreen);
})(window);
