import * as wordLib from "./wordLib.mjs"
import * as domLib from "./domLib.mjs"


//VARS/////////////////////////////////////////////////////////////////////////////////////////////
let livesCounter;
let lives;
let win;
let usedLetters;
let underscores;
let userWord;
let completeWord;

//start Functions/////////////////////////////////////////////////////////////////////////////////////
export function init(){
    makeEventListeners();
    reset();
}

function makeEventListeners(){
    const startbtn = document.querySelector("#startBtn");
    const replayButton = document.querySelector("#replay");
    const subButton = document.querySelector("#submit");
    startbtn.addEventListener("click", startGame);
    subButton.addEventListener("click", turn);
    document.addEventListener("keyup", function f(event){
        if(event.code === "Enter"){
            event.preventDefault();
            turn();
        }
    });
    replayButton.addEventListener("click", reset);

}

function reset(){
    const settingPage = document.querySelector("#settings");
    const endPage = document.querySelector("#end");
    const playPage = document.querySelector("#playing");

    win = false;
    usedLetters = [];
    completeWord = "";
    playPage.classList.add("invis");
    endPage.classList.add("invis");
    settingPage.classList.remove("invis");
}

function startGame(){
    [underscores, completeWord, userWord] = wordLib.Pickword();
    setLives();
    domLib.infoText(lives, livesCounter, usedLetters, underscores);
}

function setLives(){
    const elem4 = document.querySelector("#lives4").checked;
    const elem8 = document.querySelector("#lives8").checked;
    const elem12 = document.querySelector("#lives12").checked;

    if(elem4 === true){
        lives = 4;
        livesCounter = 4;
    } else if(elem8 === true){
        lives = 8;
        livesCounter = 8;
    } else if(elem12 === true){
        lives = 12;
        livesCounter = 12;
    }
}

//In Game Functions////////////////////////////////////////////////////////////////////////////////////////
function turn(){
    console.log(completeWord);
    const letter = document.querySelector("#letter").value.toLowerCase();
    const info2 = document.querySelector("#info2");
    // letter = letter.toLowerCase();
    if (letter === ""){
        info2.textContent = "there needs to be a letter in the input box before you submit";
    }else if(usedLetters.includes(letter)){
        info2.textContent = `you have already guessed ${letter}`
    }else{
        info2.textContent = "";
        usedLetters.push(letter);
        let place = 0;
        const OldUnderscour = [];
        for(const item of underscores){
            OldUnderscour.push(item);
        }
        for (const wordLetter of userWord){
            if (wordLetter === letter){
                underscores.splice(place, 1, letter);
            }
            place++;
        }
        if (OldUnderscour.join() === underscores.join()){
            livesCounter -=1;
        }
    }

    //end of turn
    domLib.infoText(lives, livesCounter, usedLetters, underscores);

    win = userWord.join() === underscores.join();
    if(win === true){
        domLib.end(livesCounter, completeWord, win);
    } else if (livesCounter <= 0){
        domLib.end(livesCounter, completeWord, win);
    }
}

