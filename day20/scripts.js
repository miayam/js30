(function (window, undefined) {
  var words = document.querySelector('.words');
  var synthesis = window.speechSynthesis;
  var utterance = new SpeechSynthesisUtterance(words.textContent);

  words.addEventListener('keyup', function (event) {

    // Utter the words if we happend to type 'CTRL' key.
    if (event.keyCode === 17) {
      utterance.text = words.textContent;
      synthesis.speak(utterance);
    }
  });
})(window);
