'use strict';
//VARS/////////////////////////////////////////////////////////////////////////////////////////////
let livesCounter;
let lives;
let win;
let usedLetters;
let underscores;
let completeWord;

//other functions///////////////////////////////////////////////////////////////////
function fetchWords(){
    let words = [];
    const randomWords = document.querySelector("#randomWords");
    const movies = document.querySelector("#movies");
    const TVShows = document.querySelector("#TV-shows");

    if(randomWords.checked === true){
        words = words.concat(fetchArray("randomWords"));
    }
    if(movies.checked === true){
        words = words.concat(fetchArray("movies"));
    }
    if(TVShows.checked === true){
        words = words.concat(fetchArray("TVShows"));
    }
    if(words === []){
        return false;
    }
    return words;
}

function fetchArray(name){
    //this is a temp solution before server stuff and fetch
    const movies = ["jurassic park","lord of the rings ","mission imposible","anchorman","groundhog day","fantastic mr fox","harry potter","shrek","how to train your drangon","jumanji","inception","the matrix","interstellar","batman the dark night","tenet","john wick","back to the future","godzilla vs kong","the shining","the terminal","cast away","labyrinth","hot fuzz","shaun of the dead","worlds end","spirited away","bee movie"];
    const randomWords = ["news","requirement","formal","manage","depart","definite","ridge","content","fragment","integrity","humanity","jazz","hangman","confuse","sunrise"];
    const TVShows = ["stranger things","friends","how i met your mother","the mandalorian","sherlock","the umbrella acadamy","community","the good place","the it crowd","dirk gentlys holistic detective agency","queens gambit","star trek","black mirror","the office","brooklyn nine nine","avatar the last air bender","santa clarita diet"];
    if(name === "movies"){
        return movies;
    }
    if(name === "TVShows"){
        return TVShows;
    }
    if(name === "randomWords"){
        return randomWords;
    }
}
//start Functions/////////////////////////////////////////////////////////////////////////////////////
function init(){
    reset();
}

function startGame(){
    [underscores, completeWord] = Pickword();
    setLives();
    infoText();
    makeEventListeners();
}

function reset(){
    const settingPage = document.querySelector("#settings");
    const endPage = document.querySelector("#end");
    const playPage = document.querySelector("#playing");
    const startbtn = document.querySelector("#startBtn");

    win = false;
    usedLetters = [];
    completeWord = "";
    playPage.classList.add("invis");
    endPage.classList.add("invis");
    settingPage.classList.remove("invis");
    startbtn.addEventListener("click", startGame);

}

function infoText(){
    const settingPage = document.querySelector("#settings");
    const playPage = document.querySelector("#playing");
    const HangPic = document.querySelector("#HangPic");
    const infoText = document.querySelector("#infoText");
    settingPage.classList.add("invis");
    playPage.classList.remove("invis");
    infoText.textContent = ` you have ${livesCounter} goes left, your used letters are: ${usedLetters.join(", ")}`; 
    wordBox.textContent = underscores.join(" ");
    HangPic.src = `assets/${lives}/${lives-livesCounter}.png`;
    document.querySelector("#letter").value = "";
}

function makeEventListeners(){
    const replayButton = document.querySelector("#replay");
    const subButton = document.querySelector("#submit");
    subButton.addEventListener("click", turn);
    document.addEventListener("keyup", function f(event){
        if(event.code === "Enter"){
            event.preventDefault();
            turn(completeWord, null);
        }
    });
    replayButton.addEventListener("click", init);

}

function Pickword(){
    const wordList = fetchWords();
    // const wordList = ["delay","correct","lick","whine","paste","grab","rejoice","work","manage","scatter","dare","cry","queue","type","increase","arrange","trust","order","report","invite","search","fail","scare","disagree","tame","start","spell","expect","pause","separate","walk","hug","prevent","recognise","inform","shade","drip","consider","pass","flood","bow","pat","introduce","tap","approve","worry","coil","contain","suspect","agree","improve","park","obtain","produce","develop","surprise","saw","reproduce","need","point","colour","clear","bleach","suppose","satisfy","intend","untidy","reduce","laugh","lighten","bubble","handle","alert","stamp","suffer","deserve","jump","slap","hop","switch","mark","behave","juggle","unpack","scorch","grin","end","hover","serve","wish","arrest","scream","compare","blind","wave","tie","provide","slow","rhyme","admit"];
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
        for (const wordLetter of completeWord){
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
    infoText()

    win = completeWord.join() === underscores.join();
    if(win === true){
        end();
    } else if (livesCounter <= 0){
        end();
    }
}

function end(){
    const endPage = document.querySelector("#end");
    const playPage = document.querySelector("#playing");
    const endInfoText = document.querySelector("#endInfoText");
    const Res = document.querySelector("#EndRes");
    endPage.classList.remove("invis");
    playPage.classList.add("invis");
    if (win === true){
        Res.textContent = "You win!";
        endInfoText.textContent = `You Win with only ${livesCounter} lives left, the word was ${completeWord.join("")}`;
    } else{
        Res.textContent = `You Loose`
        endInfoText.textContent = `You lost, the word is ${completeWord.join("")}`;
    }

}








window.addEventListener("load", init);