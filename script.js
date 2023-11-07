document.addEventListener("DOMContentLoaded", function () {
    let selectLanguage = document.getElementById("selectLanguage");
    let englishInput = document.getElementById("englishInput");
    let translationOutput = document.getElementById("translationOutput");
    let button = document.querySelector("button");

    // Lägg till händelselyssnare när sidan laddats 
    function initializePage() {
        selectLanguage.addEventListener("change", clearTranslation);
        button.addEventListener("click", translateText);
    }

    // Rensa översättningen
    function clearTranslation() {
        translationOutput.value = "";
    }

    englishInput.addEventListener("input", function () {
        if (englishInput.value === "") {
            clearTranslation();
        }
    });

    // Översätt texten
    async function translateText() {
        let selectedLanguage = selectLanguage.value;
        let textToTranslate = englishInput.value;
        let apiUrl = getTranslationAPI(selectedLanguage);

        try {
            let translatedText = await fetchTranslation(apiUrl, textToTranslate);
            updateTranslation(translatedText);
        } catch (error) {
            handleTranslationError(selectedLanguage, error);
        }
    }

    // Hämta översättningstjänstens URL baserat på valt språk
    function getTranslationAPI(language) {
        switch (language) {
            case "yoda":
                return "https://api.funtranslations.com/translate/yoda.json";
            case "pirate":
                return "https://api.funtranslations.com/translate/pirate.json";
            case "shakespeare":
                return "https://api.funtranslations.com/translate/shakespeare.json";
            case "minion":
                return "https://api.funtranslations.com/translate/minion.json";
            case "morse":
                return "https://api.funtranslations.com/translate/morse.json";
            case "sindarin":
                return "https://api.funtranslations.com/translate/sindarin.json";
            default:
                return "";
        }
    }

    // Hämta översatt text från API med hjälp av POST
    async function fetchTranslation(apiUrl, text) {
        let response = await fetch(apiUrl, {
            method: "POST",
            body: new URLSearchParams({ text: text }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error code: ${response.status}, HTTP error message: ${response.statusText}`);
        }

        let data = await response.json();
        return data.contents.translated;
    }

    // Uppdatera översättningen på sidan
    function updateTranslation(translatedText) {
        translationOutput.value = translatedText;
    }

    // Hantera error och visa anpassade errormeddelanden
    function handleTranslationError(language, error) {
        let errorMessage = "";
        switch (language) {
            case "yoda":
                errorMessage = "Not good enough, error your force is. Practice harder you need.";
                break;
            case "pirate":
                errorMessage = "Ye got an error, ye be not good enough t' be a Corsair, bye!";
                break;
            case "shakespeare":
                errorMessage = "I am mine most humble apology but thee did get an error.";
                break;
            case "minion":
                errorMessage = "Error! via, too deep a boma leh ji!";
                break;
            case "morse":
                errorMessage = ". .-. .-. --- .-.";
                break;
            case "sindarin":
                errorMessage = "Verui sorrui but ha seems cin got an mist";
                break;
            default:
                errorMessage = "An error occurred.";
                break;
        }
        console.error(errorMessage, error);
        translationOutput.value = errorMessage;
    }

    // Initialisera sidan
    initializePage();
});

  


