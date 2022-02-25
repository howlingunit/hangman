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