const recongnition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)();
recongnition.lang = "en-US";

const btn = document.querySelector("#btn");
btn.addEventListener("click", () => {
  // Converting text format to voice or speak format
  function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-GB";
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
    } else if (command.includes("open instagram"),
    command.includes("open insta")) {
      //this is opening instagram
      speak("Opening Instagram...");
      window.open("https://www.instagram.com/prashanttt__214", "_blank");
    } else if (command.includes("open whatsapp")) {
      //this is opening Whatsapp
      speak("Opening Whatsapp...");
      window.open("https://www.whatsapp.com", "_blank");
    } else if (command.includes("open google")) {
      //this is opening Whatsapp
      speak("Opening Google...");
      window.open("https://www.google.com", "_blank");
    } else {
      //this is searching on Google
      speak("search on Google...");
      window.open(`https://www.google.com/search?q=${command}`, "_blank");
    }
  }
  speak("How can I help you today?");

  setTimeout(() => {
    btn.style.color = "white";
    btn.style.backgroundColor = "red";
    recongnition.start();
  }, 2100);

  recongnition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase()
    handleCommands(command)
    console.log(command);
    
  };
  recongnition.onend = () => {
    btn.convertDesgin();
    btn.style.backgroundColor = "#fff";
  };

  function convertDesgin(){
    querySelector(".bx-x").style.display = "block";
  }
});

