const recongnition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)();
recongnition.lang = "en-US";

const btn = document.querySelector("#btn");
btn.addEventListener("click", () => {
  // Converting text format to voice or speak format
  function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  }

  function handleCommands(command) {
    if (command.includes("Open github")) {
      //this is opening Github
      speak("Opening Github...");
      window.open("https://www.github.com/prashantjaybhaye", "_blank");
    } else if (command.includes("open youtube")) {
      //this is opening Youtube
      speak("Opening Youtube...");
      window.open("https://www.youtube.com", "_blank");
    } else if (command.includes("open instagram")) {
      //this is opening instagram
      speak("Opening Instagram...");
      window.open("https://www.instagram.com/prashanttt__214", "_blank");
    } else if (command.includes("open insta")) {
      //this is opening instagram
      speak("Opening Instagram...");
      window.open("https://www.instagram.com/prashanttt__214", "_blank");
    } else {
      speak("search on Youtube...");
    }
  }
  speak("I'm your voice assistant, Just ask away!!");

  setTimeout(() => {
    recongnition.start();
  }, 3000);

  recongnition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase()
    handleCommands(command)
        
  };
});

