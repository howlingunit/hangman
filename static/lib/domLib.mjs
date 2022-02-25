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
            currentLine.appendChild(letterBox);
        }

    }
}

export function infoText(lives, livesCounter, usedLetters, underscores, hint, wordDef){
    const settingPage = document.querySelector("#settings");
    const playPage = document.querySelector("#playing");
    const HangPic = document.querySelector("#HangPic");
    const infoText = document.querySelector("#infoText");
    const usedLettersElem = document.querySelector("#usedLetters");
    const hintP=document.querySelector("#hintP");

    settingPage.classList.add("invis");
    settingPage.classList.remove("settingClass");
    playPage.classList.remove("invis");
    infoText.textContent = ` you have ${livesCounter} goes left, your used letters are:`; 
    usedLettersElem.textContent= `${usedLetters.join(", ")}`
    wordBox.textContent = underscores.join("");
    HangPic.src = `assets/${lives}/${lives-livesCounter}.png`;
    document.querySelector("#letter").value = "";
    hintP.textContent = "";
    if(hint && livesCounter < lives/2){
        hintP.textContent = `Hint: ${wordDef}`
    }
}

export function end(livesCounter, completeWord, win){
    const endPage = document.querySelector("#end");
    const playPage = document.querySelector("#playing");
    const endInfoText = document.querySelector("#endInfoText");
    const Res = document.querySelector("#EndRes");
    endPage.classList.remove("invis");
    playPage.classList.add("invis");
    if (win === true){
        Res.textContent = "You win!";
        endInfoText.textContent = `You Win with only ${livesCounter} lives left, the word was ${completeWord}`;
    } else{
        Res.textContent = `You Loose`
        endInfoText.textContent = `You lost, the word is ${completeWord}`;
    }

}