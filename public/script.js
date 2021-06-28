var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var guesses = document.getElementById("guess");

var testBtn = document.getElementById("start-button");
var resetBtn = document.getElementById("reset-button");

function testSpeech() {
  testBtn.disabled = true;

  var answer = test();
  guesses.innerHTML = "Waiting for your response....";

  var grammar = "#JSGF V1.0; grammar phrase; public <phrase> = " + answer + ";";

  var recognition = new SpeechRecognition();
  recognition.addEventListener("end", recognition.start);
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.continuous = true;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function (event) {
    var speechResult = event.results[0][0].transcript.toLocaleLowerCase();

    if (speechResult === answer) {
      guesses.innerHTML = "Correct!!! Great job!";
      guesses.style.backgroundColor = "rgba(21, 228, 73, 0.3)";
      resetBtn.style.display = "block";
      clearInterval(downloadTimer);
    } else {
      guesses.innerHTML = "Aw, incorrect!!! Try again. <br /> <small>(If you're feeling lazy, let the timer run <br /> out to reveal the answer.)</small>.";
      guesses.style.backgroundColor = "rgba(243, 8, 8, 0.4)";
      resetBtn.style.display = "block";
    }

    console.log("Confidence: " + event.results[0][0].confidence);
  };

  recognition.onspeechend = function () {
    testBtn.disabled = false;
  };

  recognition.onaudiostart = function (event) {
    console.log("SpeechRecognition.onaudiostart");
  };

  recognition.onaudioend = function (event) {
    //Fired when the user agent has finished capturing audio.
    console.log("SpeechRecognition.onaudioend");
  };

  recognition.onend = function (event) {
    //Fired when the speech recognition service has disconnected.
    console.log("SpeechRecognition.onend");
  };

  recognition.onnomatch = function (event) {
    //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
    console.log("SpeechRecognition.onnomatch");
  };

  recognition.onsoundstart = function (event) {
    //Fired when any sound — recognisable speech or not — has been detected.
    console.log("SpeechRecognition.onsoundstart");
  };

  recognition.onsoundend = function (event) {
    //Fired when any sound — recognisable speech or not — has stopped being detected.
    console.log("SpeechRecognition.onsoundend");
  };

  recognition.onspeechstart = function (event) {
    //Fired when sound that is recognised by the speech recognition service as speech has been detected.
    console.log("SpeechRecognition.onspeechstart");
  };
  recognition.onstart = function (event) {
    //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
    console.log("SpeechRecognition.onstart");
  };
}

var downloadTimer;

const countdown = () => {
  var timeleft = 20;
   downloadTimer = setInterval(function () {
    if (timeleft <= -1) {
      clearInterval(downloadTimer);
      window.alert(`Time is Up! The correct answer was ${test()}!`);
      window.location.reload();
    } else {
      document.getElementById("countdown").innerHTML =
        `Countdown: ${timeleft} seconds left`;
    }
    timeleft -= 1;
  }, 1000);
}

document.getElementById("start-button").addEventListener("click", countdown);

document.getElementById("start-button").onclick = function (event) {
  document.getElementById("blocker").className = "hidden";
};

testBtn.addEventListener("click", testSpeech);

document.getElementById("reset-button").onclick = function (event) {
  window.location.reload();
};
