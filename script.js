const textareaFrom = document.querySelector("#textareaFrom");
const textareaTo = document.querySelector("#textareaTo");
const selects = document.querySelectorAll("select");

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

selects.forEach((tag) => {
    for (let country in countries) {
        let selected;
        if (tag.className.includes("selectFrom") && country == "pt-BR") {
            selected = "selected";
        } else if (tag.className.includes("selectTo") && country == "en-GB") {
            selected = "selected";
        }

        const option = `<option value="${country}" ${selected}>${countries[country]}</option>`;

        tag.insertAdjacentHTML("beforeend", option);
    }
});

textareaFrom.addEventListener("keypress", (event) => {
    if (event.code === "Enter") {
        loadTranslation();
    }
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
