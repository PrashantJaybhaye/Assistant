const recongnition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)();
recongnition.lang = "en-US";
lucide.createIcons();

const btn = document.querySelector("#voiceButton");
const voiceButton = document.getElementById("voiceButton");
const buttonIcon = voiceButton.querySelector(".button-icon");
const statusText = document.querySelector(".status-text");
const statusDot = document.querySelector(".status-dot");
const pulseRing = document.querySelector(".pulse-ring");
let isListening = false;

btn.addEventListener("click", () => {
  isListening = !isListening;
  if (isListening) {
    buttonIcon.innerHTML = '<i data-lucide="mic-off" class="mic-icon"></i>';
    statusText.textContent = "Listening...";
    statusDot.classList.add("active");
    pulseRing.classList.add("active");
  } else {
    buttonIcon.innerHTML = '<i data-lucide="mic" class="mic-icon"></i>';
    statusText.textContent = "Ready to Listen";
    statusDot.classList.remove("active");
    pulseRing.classList.remove("active");
  }
  lucide.createIcons();
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
    } else if (command.includes("open instagram") || command.includes("open insta")) {
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
    recongnition.start();
  }, 3000);

  recongnition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    handleCommands(command);
    console.log(command);
  };
  recongnition.onend = () => {
    btn.convertDesgin();
    btn.style.backgroundColor = "#fff";
  };

  
});
