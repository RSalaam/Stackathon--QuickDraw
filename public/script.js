// var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
// var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
// var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

document.getElementById("start-button").addEventListener("click", function () {
  var timeleft = 20;
  var downloadTimer = setInterval(function () {
    if (timeleft <= -1) {
      clearInterval(downloadTimer);
      window.alert("Time is Up!")
      location.reload()
    } else {
      document.getElementById("countdown").innerHTML =
        timeleft + " seconds left";
    }
    timeleft -= 1;
  }, 1000);
});

document.getElementById('start-button').onclick = function(event) {
    document.getElementById('blocker').className = "hidden";
}


