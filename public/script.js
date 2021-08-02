var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var guesses = document.getElementById("guess"); //Empty div, will add to it once start button clicked

var testBtn = document.getElementById("start-button");
var retryBtn = document.getElementById("retry-button");
var newGameBtn = document.getElementById("new-game-button")

function speech() {
  testBtn.disabled = true; //Disables START! button when speech recognition begins

  var answer = test(); //This comes from script2.js
  guesses.innerHTML = "Waiting for your response...."; //Blank div in HTML file

  var grammar = "#JSGF V1.0; grammar phrase; public <phrase> = " + answer + ";";//1) Grammar format, 2) Sets grammar on the phrase you're looking for, 3) Sets alternative, acceptable answers

  var recognition = new SpeechRecognition(); 
  recognition.addEventListener("end", recognition.start); //Added this in to keep the recognition going if the user takes a while to start speaking (otherwise, it stops trying to listen after 8 seconds or so)
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1); //Adds grammar to a SpeechGrammarList object, and sets "importance" of our grammar vs other grammars in the list (0 to 1)
  recognition.grammars = speechRecognitionList; //sets the recognition to our defined grammar
  recognition.continuous = true; //Doesn't change game behavior, but changes what's added to results list, I guess
  recognition.lang = "en-US"; //Sets the language
  recognition.interimResults = false; //Setting this to false stopped "incorrect" message from being rendered prematuraly before "correct" message.
  recognition.maxAlternatives = 1; //If speech not recognized, provide alternatives to choose from

  recognition.start();

  recognition.onresult = function (event) {
    var speechResult = event.results[0][0].transcript.toLocaleLowerCase(); //results[0][0].transcript = individual results based upon what's spoken

    if (speechResult === answer) {
      guesses.innerHTML = "Correct!!! Great job!";
      guesses.style.backgroundColor = "rgba(21, 228, 73, 0.3)";
      newGameBtn.style.display = "block";
      clearInterval(downloadTimer); //Added this to stop the timer
    } else {
      guesses.innerHTML = "Aw, incorrect!!! Try again. <br /> <small>(If you're feeling lazy, let the timer run <br /> out to reveal the answer.)</small>";
      guesses.style.backgroundColor = "rgba(243, 8, 8, 0.4)";
      retryBtn.style.display = "block";
    }

    console.log("Confidence: " + event.results[0][0].confidence); //Best practice
  };

  recognition.onspeechend = function () {
    testBtn.disabled = false;//Allow START button to be functional again
  };

  //BELOW are best practices to ensure that the program is working...
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

testBtn.addEventListener("click", speech); //This starts the speech recognition, since it's called within the speech function

document.getElementById("retry-button").onclick = function (event) {
  window.location.reload();
};

document.getElementById("new-game-button").onclick = function (event) {
  //Placeholder. Use some Firebase get logic to grab new series of images!!
  window.location.reload();
};
