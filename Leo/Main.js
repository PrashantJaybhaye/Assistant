const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";
lucide.createIcons();

const voiceButton = document.getElementById("voiceButton");
const buttonIcon = voiceButton.querySelector(".button-icon");
const statusText = document.querySelector(".status-text");
const statusDot = document.querySelector(".status-dot");
const pulseRing = document.querySelector(".pulse-ring");

const chatInput = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");
const chatMessages = document.getElementById("chatMessages");
const darkModeButton = document.getElementById("darkModeButton");

const chatBox = document.querySelector(".chat-box");

const menuToggleButton = document.getElementById("menuToggleButton");
const chatBoxContainer = document.querySelector(".chat-box-container");

menuToggleButton.addEventListener("click", () => {
  chatBoxContainer.classList.toggle("active");
  chatBox.classList.toggle("active");
});

let isListening = false;

// Activate dark mode on page load
window.onload = () => {
  document.body.classList.add("dark-mode");
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

sendButton.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendMessage();
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

function sendMessage() {
  const message = chatInput.value.trim();
  if (message) {
    addMessageToChat("You", message);
    chatInput.value = "";
    // Here you can add code to handle the message, e.g., send it to a server or process it
  }
}

function addMessageToChat(sender, message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat-message");
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

darkModeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

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

// Responsive chat box
window.addEventListener("resize", () => {
  if (window.innerWidth <= 640) {
    chatBox.style.position = "fixed";
    chatBox.style.bottom = "0";
    chatBox.style.left = "0";
    chatBox.style.width = "100%";
    chatBox.style.height = "50%";
    chatBox.style.overflow = "hidden";
    chatBox.style.borderRadius = "1rem 1rem 0 0";
  } else {
    chatBox.style.position = "fixed";
    chatBox.style.left = "0";
    chatBox.style.bottom = "0";
    chatBox.style.width = "300px";
    chatBox.style.height = "100%";
    chatBox.style.overflowY = "auto";
    chatBox.style.borderRadius = "0";
  }
});

// Initial check for responsive chat box
if (window.innerWidth <= 640) {
  chatBox.style.position = "fixed";
  chatBox.style.bottom = "0";
  chatBox.style.left = "0";
  chatBox.style.width = "100%";
  chatBox.style.height = "50%";
  chatBox.style.overflow = "hidden";
  chatBox.style.borderRadius = "1rem 1rem 0 0";
} else {
  chatBox.style.position = "fixed";
  chatBox.style.left = "0";
  chatBox.style.bottom = "0";
  chatBox.style.width = "300px";
  chatBox.style.height = "100%";
  chatBox.style.overflowY = "auto";
  chatBox.style.borderRadius = "0";
}
