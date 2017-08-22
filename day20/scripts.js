(function (window, undefined) {
  var words = document.querySelector('.words');
  var synthesis = window.speechSynthesis;
  var wordsArray;
  var lastWord;
  var utterance;

  // It's actually from Stack Overflow. Remove empty
  // element like "", null or undefined from
  // array.
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
    // Utter the last typed word if we happend to type 'space'
    // key after that.
    if (event.keyCode === 32) {
      wordsArray = words.textContent.split(' ');
      cleanedArray = cleanArray(wordsArray);
      lastWord = cleanedArray[cleanedArray.length - 1];
      utterance = new SpeechSynthesisUtterance(lastWord);
      synthesis.speak(utterance);
    }
  });
})(window);
