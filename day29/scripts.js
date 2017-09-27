(function (timer) {
  var buttons = document.querySelectorAll('[data-time]');
  var form = document.customForm;

  function setTimer() {
    var seconds = parseInt(this.dataset.time);
    timer(seconds);
  }

  function setCustomTimer(event) {
    var minutes, seconds;

    event.preventDefault();
    minutes = this.minutes.value;
    seconds = minutes * 60;
    timer(seconds);
    this.reset();
  }

  form.addEventListener('submit', setCustomTimer);

  buttons.forEach(function (button) {
    button.addEventListener('click', setTimer);
  });
})((function (window, undefined) {
    var countdown = null;
    var timerDisplay = document.querySelector('.display__time-left');
    var endTime = document.querySelector('.display__end-time');

    function displayTimeLeft(seconds) {
      var minutes = window.Math.floor(seconds / 60);
      var remainderSeconds = seconds % 60;
      var display;

      minutes = window.Math.round(minutes);
      display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
      timerDisplay.textContent = display;
      document.title = display;
    }

    function displayEndTime(timestamps) {
      var end = new Date(timestamps);
      var hours = end.getHours();
      var adjustedHours = hours > 12 ? hours - 12 : hours;
      var minutes = end.getMinutes();
      endTime.textContent = `Be back at ${adjustedHours}:${minutes}`;
    }

    return function timer(seconds) {
      var now = Date.now();
      var then = now + seconds * 1000;

      window.clearInterval(countdown);

      displayTimeLeft(seconds);
      displayEndTime(then);

      countdown = window.setInterval(function () {
        var secondsLeft = (then - Date.now()) / 1000
        secondsLeft = window.Math.round(secondsLeft);

        if (secondsLeft < 0) {
          window.clearInterval(countdown);
          return;
        }

        displayTimeLeft(secondsLeft);
      }, 1000);
    };
  })(window)
);
