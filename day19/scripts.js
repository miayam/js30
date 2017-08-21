(function (window, undefined) {
  var video = document.querySelector('.player');
  var canvas = document.querySelector('.photo');
  var strip = document.querySelector('.strip');
  var snap = document.querySelector('.snap');
  var context = canvas.getContext('2d');
  var takePhotoButton = document.querySelector('.take-photo-js');
  var timeout;

  function getVideo() {
    navigator.mediaDevices.getUserMedia({
      video: true, audio: false
    }).then(function (localMediaStream) {
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    }).catch(function (error) {
      console.error(`${error}`);
    });
  }

  function paintToCanvas() {
    var pixels;
    var width = video.videoWidth;
    var height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;
    canvas.parentNode.width = width;
    canvas.parentNode.height = height;
    context.translate(width, 0);
    context.scale(-1, 1);

    window.clearInterval(timeout);

    timeout = window.setInterval(function () {
      context.drawImage(video, 0, 0, width, height);
    }, 16);
  }

  function takePhoto() {
    var data = canvas.toDataURL('image/jpeg');
    var link = document.createElement('a');
    var numbering = Math.floor(Math.random() * 1000000);


    snap.currentTime = 0;
    snap.play();

    link.href = data;
    link.setAttribute('download', `handsome-${numbering}.jpeg`);

    link.innerHTML = `<img src="${data}" alt="photo" />`;
    strip.insertBefore(link, strip.firstChild);
  }

  function init() {
    getVideo();
    video.addEventListener('canplay', paintToCanvas);
    takePhotoButton.addEventListener('click', takePhoto);
  }

  return {
    init: init,
    canvas: canvas,
    video: video
  };
})(window).init();
