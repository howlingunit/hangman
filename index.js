'use strict';

let score = 0;
let Gunderscores = [];
let win = false;
let usedLetters = [];


function refresh(){
    location.reload();
}

function Pickword(){
    const wordList = ["delay","correct","lick","whine","paste","grab","rejoice","work","manage","scatter","dare","cry","queue","type","increase","arrange","trust","order","report","invite","search","fail","scare","disagree","tame","start","spell","expect","pause","separate","walk","hug","prevent","recognise","inform","shade","drip","consider","pass","flood","bow","pat","introduce","tap","approve","worry","coil","contain","suspect","agree","improve","park","obtain","produce","develop","surprise","saw","reproduce","need","point","colour","clear","bleach","suppose","satisfy","intend","untidy","reduce","laugh","lighten","bubble","handle","alert","stamp","suffer","deserve","jump","slap","hop","switch","mark","behave","juggle","unpack","scorch","grin","end","hover","serve","wish","arrest","scream","compare","blind","wave","tie","provide","slow","rhyme","admit"];
    // const wordList = ["test", "test2", "test3", "test4", "and", "so", "on"];
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    const [underscores, completeWord] = makeWordArr(word);
    return [underscores, completeWord];
}

function makeWordArr(word){
    let underscores = [];
    let completeWord = [];
    for(const item of word){
        underscores.push("_");
        completeWord.push(item);
    }
    return [underscores, completeWord];
}

function end(completeWord){
    const endPage = document.querySelector("#end");
    const playPage = document.querySelector("#playing");
    const endInfoText = document.querySelector("#endInfoText");
    const Res = document.querySelector("#EndRes");
    endPage.classList.remove("invis");
    playPage.classList.add("invis");
    if (win === true){
        resizeBy.textContent = "You win!"
        endInfoText.textContent = `You Win with only ${8-score} lives left, the word was ${completeWord.join("")}`;
    } else{
        Res.textContent = `You Loose`
        endInfoText.textContent = `You lost, the word is ${completeWord.join("")}`;
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
        for(const item of Gunderscores){
            OldUnderscour.push(item);
        }
        for (const wordLetter of completeWord){
            if (wordLetter === letter){
                Gunderscores.splice(place, 1, letter);
            }
            place++;
        }
        if (OldUnderscour.join() === Gunderscores.join()){
            score +=1;
        }
    }

    //end of turn
    infoText.textContent = `you have ${8 - score} goes left, your used letters are: ${usedLetters.join(", ")}`; 
    wordBox.textContent = Gunderscores.join(" ");
    HangPic.src = `assets/${score}.png`;
    document.querySelector("#letter").value = "";

    win = completeWord.join() === Gunderscores.join();
    if(win === true){
        end(completeWord);
    } else if (score >= 8){
        end(completeWord);
    }
}

function init(){
    const endPage = document.querySelector("#end");
    const playPage = document.querySelector("#playing");
    const replayButton = document.querySelector("#replay");
    const HangPic = document.querySelector("#HangPic");
    const infoText = document.querySelector("#infoText");
    const subButton = document.querySelector("#submit");
    let [underscores, completeWord] = Pickword();
    Gunderscores = underscores;
    usedLetters = [];
    score = 0;

    playPage.classList.remove("invis");
    endPage.classList.add("invis");

    
    infoText.textContent = ` you have ${8 - score} goes left, your used letters are: ${usedLetters.join(", ")}`; 
    wordBox.textContent = Gunderscores.join(" ");
    HangPic.src = `assets/${score}.png`;
    subButton.addEventListener("click", turn.bind(null, completeWord));
    document.addEventListener("keyup", function(event) {
        console.log(event.code);
        if(event.code === "Enter"){
            event.preventDefault();
            turn(completeWord, null);
        }
    })
    replayButton.addEventListener("click", refresh);

}
window.addEventListener("load", init);