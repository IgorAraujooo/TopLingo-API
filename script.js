const textareaFrom = document.querySelector("#textareaFrom");
const textareaTo = document.querySelector("#textareaTo");
const selects = document.querySelectorAll("select");
const microphoneButton = document.getElementById("microphoneButton");

const countries = {
    "en-GB": "Inglês",
    "es-ES": "Espanhol",
    "it-IT": "Italiano",
    "pt-BR": "Português",
};

function toggleDarkMode(isDarkMode) {
    var body = document.body;
    var buttonEscuro = document.getElementById("button-modo-escuro");
    var buttonClaro = document.getElementById("button-modo-claro");

    if (isDarkMode) {
        body.classList.add("dark-mode");
        buttonEscuro.style.display = "none";
        buttonClaro.style.display = "inline";
    } else {
        body.classList.remove("dark-mode");
        buttonEscuro.style.display = "inline";
        buttonClaro.style.display = "none";
    }
}

selects.forEach((select) => {
    for (let country in countries) {
        let selected = "";
        if (select.classList.contains("selectFrom") && country === "pt-BR") {
            selected = "selected";
        } else if (select.classList.contains("selectTo") && country === "en-GB") {
            selected = "selected";
        }

        const option = `<option value="${country}" ${selected}>${countries[country]}</option>`;
        select.insertAdjacentHTML("beforeend", option);
    }
});

textareaFrom.addEventListener("keypress", (event) => {
    if (event.code === "Enter") {
        if (textareaFrom.value.toLowerCase() === "alice") {
            toggleDarkMode(true); 
        } else {
            loadTranslation();
        }
    }
});

microphoneButton.addEventListener('click', function() {
    var speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        textareaFrom.value = transcript;
    });

    recognition.start();
});

function loadTranslation() {
    fetch(
        `https://api.mymemory.translated.net/get?q=${textareaFrom.value}&langpair=${selects[0].value}|${selects[1].value}`
    )
    .then((res) => res.json())
    .then((data) => {
        textareaTo.value = data.responseData.translatedText;
    });
}
