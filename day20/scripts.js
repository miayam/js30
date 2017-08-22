(function (window, undefined) {
  var words = document.querySelector('.words');
  var synthesis = window.speechSynthesis;
  var timeout;
  var wordsArray;
  var lastWord;
  var utterance;

  // It's actually from Stack Overflow
  function cleanArray(actual) {
    var newArray = [];
    for (var i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i]);
      }
    }
    return newArray;
  }

  words.addEventListener('keyup', function (event) {
    // Utter the words if we type 'space' key.
    if (event.keyCode === 32) {
      wordsArray = words.textContent.split(' ');
      cleanedArray = cleanArray(wordsArray);
      lastWord = cleanedArray[cleanedArray.length - 1];
      utterance = new SpeechSynthesisUtterance(lastWord);
      synthesis.speak(utterance);
    }
  });
})(window);
