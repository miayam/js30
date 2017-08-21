(function (window, undefined) {
  var video = document.querySelector('.player');
  var canvas = document.querySelector('.photo');
  var strip = document.querySelector('.strip');
  var snap = document.querySelector('.snap');
  var context = canvas.getContext('2d');
  var takePhotoButton = document.querySelector('.take-photo-js');
  var timeout;

  // It's copy-pasted from internet, but I can explain this
  // interesting function in my own words.
  // It's well-explained by John Dugan http://bit.ly/2troSTT
  function debounce(func, wait = 20, immediate = true) {
    // It will store unique ID (number) that `window.setTimeout` return.
    // For more about 'window.setTimeout', visit https://mzl.la/2uuQs7Z
    var timeout;

    return function() {
      // In this case, `this` has reference to `video` object and
      // `arguments` is an array-like object that includes event
      // the `video` object listen to ('canplay').
      var context = this, args = arguments;

      // This condition make function being passed to `debounce`
      // function (`func`) run without having to wait as long as
      // `timeout` is cleared away. So, the first time `debounce`
      // return this anonymous function and have it listen to 'canplay'
      // event, `func` will run immediately.
      var callNow = immediate && !timeout;

      // This function will fire after we have waited for certain amount
      // of time. `wait` parameter contains that duration.
      function later() {
        // Nullify the variable that stores unique ID (number) after the
        // timeout passed.
        timeout = null;

        // If we set `func` not to run immediately after `debounce` being
        // called, run it anyway after the timeout passed.
        if (!immediate) {
          func.apply(context, args);
        }
      }
    };
  }

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

    clearTimeout(timeout);

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
    strip.insertBefore(link, strip.firsChild);
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
