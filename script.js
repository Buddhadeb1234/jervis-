
const btn = document.querySelector("#btn");
const content = document.querySelector("#content");
const voice = document.querySelector("#voice");

// Text-to-speech
function speak(text) {
    if (!("speechSynthesis" in window)) {
        content.innerText = text;
        return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = "en-IN";

    window.speechSynthesis.speak(utterance);
}

// Check browser speech recognition support
const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

let recognition = null;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
        const transcript =
            event.results[event.resultIndex][0].transcript;

        content.innerText = transcript;
        takeCommand(transcript.toLowerCase());
    };

    recognition.onerror = (event) => {
        content.innerText = "Microphone error: " + event.error;
        btn.style.display = "flex";
        voice.style.display = "none";
    };

    recognition.onend = () => {
        btn.style.display = "flex";
        voice.style.display = "none";
    };
} else {
    content.innerText =
        "Voice recognition is not supported in this browser.";
}

// Start listening
btn.addEventListener("click", () => {
    if (!recognition) {
        speak("Voice recognition is not supported in this browser.");
        return;
    }

    try {
        content.innerText = "Listening...";
        btn.style.display = "none";
        voice.style.display = "block";
        recognition.start();
    } catch (error) {
        content.innerText = "Please try again.";
        btn.style.display = "flex";
        voice.style.display = "none";
    }
});

// Commands
function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello")) {
        speak("Hello sir, what can I help you with?");
    }

    else if (message.includes("who are you")) {
        speak("I am Jarvis, your virtual assistant, created by Buddhadeb sir.");
    }

    else if (message.includes("time")) {
        const time = new Date().toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "numeric"
        });
        speak("The time is " + time);
    }

    else if (message.includes("date")) {
        const date = new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
        speak("Today's date is " + date);
    }

    else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com", "_blank");
    }

    else if (message.includes("open google")) {
        speak("Opening Google");
        window.open("https://www.google.com", "_blank");
    }

    else if (message.includes("open facebook")) {
        speak("Opening Facebook");
        window.open("https://www.facebook.com", "_blank");
    }

    else if (message.includes("open instagram")) {
        speak("Opening Instagram");
        window.open("https://www.instagram.com", "_blank");
    }

    else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp");
        window.open("https://web.whatsapp.com", "_blank");
    }

    else if (message.includes("open calculator")) {
        speak("Please open your calculator app.");
    }

    else if (message.includes("open")) {
        speak("Searching for " + message.replace("open", ""));
        window.open(
            "https://www.google.com/search?q=" +
            encodeURIComponent(message.replace("open", "")),
            "_blank"
        );
    }

    else {
        speak("I heard you say " + message +
              ". I don't know that command yet.");
    }
}


