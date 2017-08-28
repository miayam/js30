(function (window, undefined) {
  var words = document.querySelector('.words');
  var synthesis = window.speechSynthesis;
  var utterance; 

  words.addEventListener('keyup', function (event) {

    // Utter the words if we happend to type 'CTRL' key.
    if (event.keyCode === 17) {
      utterance = new SpeechSynthesisUtterance(words.textContent);
      synthesis.speak(utterance);
    }
  });
})(window);
