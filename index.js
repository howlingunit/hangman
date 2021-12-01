'use strict';

let score = 0;
let GUnderscours = [];
let win = false;
let usedLetters = [];


function refresh(){
    location.reload();
}

function Pickword(){
    const wordList = ["delay","correct","lick","whine","paste","grab","rejoice","work","manage","scatter","dare","cry","queue","type","increase","arrange","trust","order","report","invite","search","fail","scare","disagree","tame","start","spell","expect","pause","separate","walk","hug","prevent","recognise","inform","shade","drip","consider","pass","flood","bow","pat","introduce","tap","approve","worry","coil","contain","suspect","agree","improve","park","obtain","produce","develop","surprise","saw","reproduce","need","point","colour","clear","bleach","suppose","satisfy","intend","untidy","reduce","laugh","lighten","bubble","handle","alert","stamp","suffer","deserve","jump","slap","hop","switch","mark","behave","juggle","unpack","scorch","grin","end","hover","serve","wish","arrest","scream","compare","blind","wave","tie","provide","slow","rhyme","admit"];
    // const wordList = ["test", "test2", "test3", "test4", "and", "so", "on"];
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    const [Underscours, completeWord] = makeWordArr(word);
    return [Underscours, completeWord];
}

function makeWordArr(word){
    let Underscours = [];
    let completeWord = [];
    for(const item of word){
        Underscours.push("_");
        completeWord.push(item);
    }
    return [Underscours, completeWord];
}

function winf(completeWord){
    //will add later
    const endPage = document.querySelector("#end");
    const playPage = document.querySelector("#playing");
    const endInfoText = document.querySelector("#endInfoText");
    // console.log("win");
    endPage.classList.remove("invis");
    playPage.classList.add("invis");
    endInfoText.textContent = `You Win with only ${8-score} lives left, the word was ${completeWord.join("")}`;
}

function lose(completeWord){
    const endPage = document.querySelector("#end");
    const playPage = document.querySelector("#playing");
    const endInfoText = document.querySelector("#endInfoText");
    const Res = document.querySelector("#EndRes");
    endPage.classList.remove("invis");
    playPage.classList.add("invis");
    Res.textContent = `You Loose`
    endInfoText.textContent = `You lost, the word is ${completeWord.join("")}`;

}

function checkWin(completeWord){
    if(completeWord.join() === GUnderscours.join()){
        return true;
    } else{
        return false;
    }
}

function turn(completeWord, e){
    // console.log(completeWord);
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
        for(const item of GUnderscours){
            OldUnderscour.push(item);
        }
        for (const wordLetter of completeWord){
            if (wordLetter === letter){
                GUnderscours.splice(place, 1, letter);
            }
            place++;
        }
        if (OldUnderscour.join() === GUnderscours.join()){
            score +=1;
        }
    }

    //end of turn
    infoText.textContent = `you have ${8 - score} goes left, your used letters are: ${usedLetters.join(", ")}`; 
    wordBox.textContent = GUnderscours.join(" ");
    HangPic.src = `assets/${score}.png`;
    document.querySelector("#letter").value = "";

    win = checkWin(completeWord);
    if(win === true){
        winf(completeWord);
    } else if (score >= 8){
        lose(completeWord);
    }
}

function onLoad(){

    const endPage = document.querySelector("#end");
    const playPage = document.querySelector("#playing");
    const replayButton = document.querySelector("#replay");
    const HangPic = document.querySelector("#HangPic");
    const infoText = document.querySelector("#infoText");
    const subButton = document.querySelector("#submit");
    let [Underscours, completeWord] = Pickword();
    GUnderscours = Underscours;
    usedLetters = [];
    score = 0;

    playPage.classList.remove("invis");
    endPage.classList.add("invis");

    
    infoText.textContent = ` you have ${8 - score} goes left, your used letters are: ${usedLetters.join(", ")}`; 
    wordBox.textContent = GUnderscours.join(" ");
    HangPic.src = `assets/${score}.png`;
    subButton.addEventListener("click", turn.bind(null, completeWord));
    document.addEventListener("keyup", function(event) {
        // console.log(event.keyCode);
        if(event.keyCode === 13){
            event.preventDefault();
            turn(completeWord, null);
        }
    })
    replayButton.addEventListener("click", refresh);

}