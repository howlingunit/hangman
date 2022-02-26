import * as wordLib from "./localWordLib.mjs"
import * as domLib from "./domLib.mjs"


//VARS/////////////////////////////////////////////////////////////////////////////////////////////
let livesCounter;
let lives;
let win;
let usedLetters;
let hint = false;
let word;

//start Functions/////////////////////////////////////////////////////////////////////////////////////
export function init(){
    domLib.createKeyboard();
    makeEventListeners();
    reset();
}

function makeEventListeners(){
    //screen keyboard listeners
    const keyButtons = document.querySelectorAll(".letterBoxStyle");
    for(let i = 0; i < keyButtons.length; i++){
        keyButtons[i].addEventListener("click", (e) => {turn(keyButtons[i].id)});
    }
    //real keyboard
    document.addEventListener("keydown", (e) => {
        if(/[a-z]/.test(e.key) && e.key.length === 1){
            turn(e.key);
        }
    })
    //replay button 
    const replay = document.querySelector("#replay");
    replay.addEventListener("click", reset);
}

function reset(){
    const endPage = document.querySelector("#end");
    //reset keyboard 
    const keys = document.querySelectorAll(".letterBoxStyle");
    for (let i = 0; i < keys.length; i++){
        keys[i].className = "letterBoxStyle BtnStyle";
    }
    //reset word 
    const wordBox = document.querySelector("#wordBox");
    wordBox.className = "";

    win = false;
    usedLetters = [];
    endPage.classList.add("invis");
    startGame();
    
}

async function startGame(){
    word = await wordLib.fetchWords();
    hint = document.querySelector("#hintTrue").checked;
    setLives();
    domLib.updateDom(lives, livesCounter, word.underscores);
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
function turn(letter){
    if(usedLetters.includes(letter)){return;}
    if(!word){return;}

    info2.textContent = "";
    usedLetters.push(letter);
    let place = 0;
    const OldUnderscour = [];
    for(const item of word.underscores){
        OldUnderscour.push(item);
    }
    for (let i = 0; i<word.word.length; i++){
        if (word.word[i] === letter){
            word.underscores[i] = letter;
            domLib.updateLetter(true, letter);
        }
        place++;
    }
    if (OldUnderscour.join("") === word.underscores.join("")){
        domLib.updateLetter(false, letter);
        livesCounter -=1;
    }

    //end of turn
    domLib.updateDom(lives, livesCounter, word.underscores, hint, word.def);

    win = word.underscores.join("") === word.word;
    if(win){
        domLib.end(word.word, win);
        word = "";
    } else if (livesCounter <= 0){
        domLib.end(word.word, win);
        word = "";
    }
}

