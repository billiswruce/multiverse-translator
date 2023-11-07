document.addEventListener("DOMContentLoaded", function () {
    //----hämtar element från HTML----
    let selectLanguage = document.getElementById("selectLanguage");
    let englishInput = document.getElementById("englishInput");
    let translationOutput = document.getElementById("translationOutput");
    let button = document.querySelector("button");

    //-----funktion som rensar översättningen när ingenting är skrivet i engelskainput-----
    function clearTranslation() {
        let inputText = englishInput.value;
        if (inputText === "") {
            translationOutput.value = "";
        }
    }
    englishInput.addEventListener("input", clearTranslation);


    //-----funktion som hämtar API baserat på det valda språket-----
    function getTranslationApiUrl(selectedLanguage) {
        if (selectedLanguage === "yoda") {
            return "https://api.funtranslations.com/translate/yoda.json";
        } else if (selectedLanguage === "pirate") {
            return "https://api.funtranslations.com/translate/pirate.json";
        } else if (selectedLanguage === "shakespeare") {
            return "https://api.funtranslations.com/translate/shakespeare.json";
        } else if (selectedLanguage === "minion") {
            return "https://api.funtranslations.com/translate/minion.json";
        } else if (selectedLanguage === "morse") {
            return "https://api.funtranslations.com/translate/morse.json";
        } else if (selectedLanguage === "sindarin") {
            return "https://api.funtranslations.com/translate/sindarin.json";
        } else {
            return "";
        }
    }

    //-----funktion som översätter texten och uppdaterar översättningen på sidan-----
    async function translateText() {
        let selectedLanguage = selectLanguage.value;
        let textToTranslate = englishInput.value;
        let apiUrl = getTranslationApiUrl(selectedLanguage);

        try {
            let translatedText = await fetchTranslation(apiUrl, textToTranslate);
            updateTranslation(translatedText, selectedLanguage);
        } catch (error) {
            handleTranslationError(error, selectedLanguage);
        }
    }

    //-----funktion som returnerar översatt text från det frågade APIet-----
    async function fetchTranslation(apiUrl, textToTranslate) {
        let response = await fetch(apiUrl, {
            method: "POST",
            body: new URLSearchParams({ text: textToTranslate }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error code: ${response.status}, HTTP error message: ${response.statusText}`);
        }

        let data = await response.json();
        return data.contents.translated;
    }

    //-----funktion som uppdaterar översättningen till sidan-----
    function updateTranslation(translatedText, selectedLanguage) {
        translationOutput.value = translatedText;
    }

    //-----funktion som hanterar error och visar lämpligt felmeddelande-----
    function handleTranslationError(error, selectedLanguage) {
        let errorMessage = "";
        if (selectedLanguage === "yoda") {
            errorMessage = "Not good enough, error your force is. Practice harder you need.";
        } else if (selectedLanguage === "pirate") {
            errorMessage = "Ye got an error, ye be not good enough t' be a Corsair, bye!";
        } else if (selectedLanguage === "shakespeare") {
            errorMessage = "I am mine most humble apology but thee did get an error.";
        } else if (selectedLanguage === "minion") {
            errorMessage = "Error! via, too deep a boma leh ji!";
        } else if (selectedLanguage === "morse") {
            errorMessage = "Error . .-. .-. --- .-.";
        } else if (selectedLanguage === "sindarin") {
            errorMessage = "Error, verui sorrui but ha seems cin got an mist.";
        } else {
            errorMessage = "An error occurred.";
        }
        console.error(selectedLanguage, error);
        translationOutput.value = errorMessage;
    }

    //-----event på knappen som översätter texten-----
    button.addEventListener("click", translateText);
});
