document.addEventListener("DOMContentLoaded", function () {
    let selectLanguage = document.getElementById("selectLanguage");
    let englishInput = document.getElementById("englishInput");
    let translationOutput = document.getElementById("translationOutput");
    let button = document.querySelector("button");

    function clearTranslation() {
        let inputText = englishInput.value;
        if (inputText === "") {
            translationOutput.value = "";
        }
    }

    englishInput.addEventListener("input", clearTranslation);
  
    button.addEventListener("click", async function () {
        let selectedLanguage = selectLanguage.value;
        let textToTranslate = englishInput.value;
        let apiUrl = "";

      if (selectedLanguage === "yoda") {
            apiUrl = "https://api.funtranslations.com/translate/yoda.json";
        } else if (selectedLanguage === "pirate") {
            apiUrl = "https://api.funtranslations.com/translate/pirate.json";
        } else if (selectedLanguage === "shakespeare") {
            apiUrl = "https://api.funtranslations.com/translate/shakespeare.json";
        } else if  (selectedLanguage === "minion") {
            apiUrl = "https://api.funtranslations.com/translate/minion.json";
        } else if  (selectedLanguage === "morse") {
            apiUrl = "https://api.funtranslations.com/translate/morse.json";
        } else if  (selectedLanguage === "sindarin") {
            apiUrl = "https://api.funtranslations.com/translate/sindarin.json";
        }

  
      try {
        let response = await fetch(apiUrl, {
          method: "POST",
          body: new URLSearchParams({ text: textToTranslate }),
        });
  
        if (response.ok === false) {
          throw new Error(`HTTP error code: ${response.status}, HTTP error message: ${response.statusText}`);
        }
  
        let data = await response.json();
        let translatedText = data.contents.translated;
        translationOutput.value = translatedText;
  
    }   catch (error) {
        if (selectedLanguage === "yoda") {
          console.error("Not good enough, error your force is. Practice harder you need.", error);
          translationOutput.value = "Not good enough, error your force is. Practice harder you need.";
        } else if (selectedLanguage === "pirate") {
          console.error("Ye got an error, ye be not good enough t' be a Corsair, bye!", error);
          translationOutput.value = "Ye got an error, ye be not good enough t' be a Corsair, bye!";
        } else if (selectedLanguage === "shakespeare") {
            console.error("I am mine most humble apology but thee did get an error.", error);
            translationOutput.value = "I am mine most humble apology but thee did get an error.";
        } else if (selectedLanguage === "minion") {
            console.error("Error! via, to deep a boma leh ji!", error);
            translationOutput.value = "Error! via, to deep a boma leh ji!";
        } else if (selectedLanguage === "morse") {
            console.error(". .-. .-. --- .-.", error);
            translationOutput.value = ". .-. .-. --- .-.";
        } else if (selectedLanguage === "morse") {
            console.error("sindarin", error);
            translationOutput.value = "Verui sorrui but ha seems cin got an mist";
            }
        }
    
    });
  });
  


