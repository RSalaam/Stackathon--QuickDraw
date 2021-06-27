var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var correctAnswer = document.getElementById("answer");
var guesses = document.getElementById("guess");

// var testBtn = document.getElementById("start-button")

var testBtn = document.getElementById("start-button")
var resetBtn = document.getElementById("reset-button")

function testSpeech() {
  testBtn.disabled = true;
  
  var answer = "axe"
  guesses.innerHTML = "Waiting for the correct response..."

  var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + answer +';';

  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function(event) {
    var speechResult = event.results[0][0].transcript.toLocaleLowerCase();

    if(speechResult === answer) {
      guesses.innerHTML = "Correct!!! Great job!"
    } 

    console.log("Confidence: " + event.results[0][0].confidence)
  }

  recognition.onspeechend = function() {
    recognition.stop()
    document.getElementById("reset-button").style.display = "block";
  }

  recognition.onaudiostart = function(event) {
    console.log("SpeechRecognition.onaudiostart")
  }

  recognition.onaudioend = function(event) {
    //Fired when the user agent has finished capturing audio.
    console.log('SpeechRecognition.onaudioend');
}

recognition.onend = function(event) {
    //Fired when the speech recognition service has disconnected.
    console.log('SpeechRecognition.onend');
}

recognition.onnomatch = function(event) {
    //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
    console.log('SpeechRecognition.onnomatch');
}

recognition.onsoundstart = function(event) {
    //Fired when any sound — recognisable speech or not — has been detected.
    console.log('SpeechRecognition.onsoundstart');
}

recognition.onsoundend = function(event) {
    //Fired when any sound — recognisable speech or not — has stopped being detected.
    console.log('SpeechRecognition.onsoundend');
}

recognition.onspeechstart = function (event) {
    //Fired when sound that is recognised by the speech recognition service as speech has been detected.
    console.log('SpeechRecognition.onspeechstart');
}
recognition.onstart = function(event) {
    //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
    console.log('SpeechRecognition.onstart');
}
  
}


document.getElementById("start-button").addEventListener("click", function () {
  var timeleft = 20;
  var downloadTimer = setInterval(function () {
    if (timeleft <= -1) {
      clearInterval(downloadTimer);
      window.alert("Time is Up! The correct answer was axe!")
      window.location.reload()
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

testBtn.addEventListener("click", testSpeech)

document.getElementById("reset-button").onclick = function(event) {
  window.location.reload()
}
















