(function (window, undefined) {
  var video = document.querySelector('.player');
  var canvas = document.querySelector('.photo');
  var strip = document.querySelector('.strip');
  var snap = document.querySelector('.snap');
  var context = canvas.getContext('2d');
  var takePhotoButton = document.querySelector('.take-photo-js');
  var photos = document.querySelector('.strip');

  function getVideo() {
    navigator.mediaDevices.getUserMedia({
      video: true, audo: true
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

    return window.setInterval(function () {
      context.drawImage(video, 0, 0, width, height);
      pixels = context.getImageData(0, 0, width, height);
      context.putImageData(pixels, 0, 0);
    }, 32);
  }

  function takePhoto() {
    var data = canvas.toDataURL('image/jpeg');
    var link = document.createElement('a');
    var numbering = Math.floor(Math.random() * 1000000);


    snap.currentTime = 0;
    snap.play();

    link.href = data;
    link.setAttribute('download', `handsome-${numbering}.jpeg`);

    link.innerHTML = `<img src="${data}" alt="I am beautiful no matter what they say. Words can't bring me down." />`;
    strip.insertBefore(link, strip.firsChild);
  }

  function forEach(callback) {
    for (var i = 0; i < this.length; i++) {
      callback.call(this, this[i], i);
    }
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
