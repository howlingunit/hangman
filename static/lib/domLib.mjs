export function createKeyboard(){
    const keys = ["nl","q","w","e","r","t","y","u","i","o","p","nl","a","s","d","f","g","h","j","k","l","nl","z","x","c","v","b","n","m"]
    const keyboardDiv = document.querySelector("#keyboard");
    let currentLine
    for(let i = 0; i < keys.length; i++){
        if(keys[i] === "nl"){
            currentLine = document.createElement("div");
            currentLine.classList.add("lineStyle");
            keyboardDiv.appendChild(currentLine);

        } else{
            const letterBox = document.createElement("div");
            const letter = document.createElement("p");
            letter.classList.add("letterStyle");
            letter.textContent = keys[i];
            letterBox.appendChild(letter);
            letterBox.classList.add("letterBoxStyle");
            letterBox.classList.add("BtnStyle");
            letterBox.id = keys[i];
            currentLine.appendChild(letterBox);
        }

    }
}

export function updateLetter(correct, letter){
    const letters = document.querySelectorAll(".letterBoxStyle");
    for(let i = 0; i < letters.length; i++){
        if(letters[i].id === letter && correct){
            letters[i].classList.add("correctLetter");
            return;
        } else if(letters[i].id === letter && !(correct)){
            letters[i].classList.add("incorrectLetter");
        }
    }

}

export function updateDom(lives, livesCounter, underscores, hint, wordDef){
    const settingPage = document.querySelector("#settings");
    const playPage = document.querySelector("#playing");
    const HangPic = document.querySelector("#HangPic");
    const hintP=document.querySelector("#hintP");

    settingPage.classList.add("invis");
    settingPage.classList.remove("settingClass");
    playPage.classList.remove("invis");
    wordBox.textContent = underscores.join("");
    HangPic.src = `assets/${lives}/${lives-livesCounter}.png`;
    hintP.textContent = "";
    if(hint && livesCounter < lives/2){
        hintP.textContent = `Hint: ${wordDef}`
    }
}

export function end(completeWord, win){
    const endPage = document.querySelector("#end");
    const wordBox = document.querySelector("#wordBox");
    endPage.classList.remove("invis");
    if (!win){
        wordBox.textContent = completeWord;
        wordBox.classList.add("incorrectWord");
    } else{
        wordBox.classList.add("correctWord");
    }

}