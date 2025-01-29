const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";
lucide.createIcons();

const voiceButton = document.getElementById("voiceButton");
const buttonIcon = voiceButton.querySelector(".button-icon");
const statusText = document.querySelector(".status-text");
const statusDot = document.querySelector(".status-dot");
const pulseRing = document.querySelector(".pulse-ring");

let isListening = false;

// Speak when the page loads
window.onload = () => {
  setTimeout(() => {
    speak("How can I help you today?");
  }, 1000); // Small delay to ensure the page is fully loaded
};

voiceButton.addEventListener("click", () => {
  if (!isListening) {
    startListening();
  } else {
    stopListening();
  }
});

function startListening() {
  isListening = true;
  buttonIcon.innerHTML = '<i data-lucide="mic-off" class="mic-icon"></i>';
  statusText.textContent = "Listening...";
  statusDot.classList.add("active");
  pulseRing.classList.add("active");
  lucide.createIcons();

  recognition.start();
}

function stopListening() {
  isListening = false;
  buttonIcon.innerHTML = '<i data-lucide="mic" class="mic-icon"></i>';
  statusText.textContent = "Ready to Listen";
  statusDot.classList.remove("active");
  pulseRing.classList.remove("active");
  lucide.createIcons();

  recognition.stop();
}

function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-GB";
  window.speechSynthesis.speak(speech);
}

function handleCommands(command) {
  if (command.includes("open github")) {
    speak("Opening Github...");
    window.open("https://www.github.com/prashantjaybhaye", "_blank");
  } else if (command.includes("open youtube")) {
    speak("Opening Youtube...");
    window.open("https://www.youtube.com", "_blank");
  } else if (command.includes("open instagram") || command.includes("open insta")) {
    speak("Opening Instagram...");
    window.open("https://www.instagram.com/prashanttt__214", "_blank");
  } else if (command.includes("open whatsapp")) {
    speak("Opening Whatsapp...");
    window.open("https://www.whatsapp.com", "_blank");
  } else if (command.includes("open google")) {
    speak("Opening Google...");
    window.open("https://www.google.com", "_blank");
  } else {
    speak("Searching on Google...");
    window.open(`https://www.google.com/search?q=${command}`, "_blank");
  }

  // Stop listening after executing a command
  stopListening();
}

recognition.onresult = (event) => {
  const command = event.results[0][0].transcript.toLowerCase();
  handleCommands(command);
  console.log("Recognized command:", command);
};

recognition.onend = () => {
  if (isListening) {
    recognition.start(); // Keep listening if still active
  }
};
