import {words} from "./words.mjs";


function fetchWords(){
    let filteredWords = [];
    const randomWords = document.querySelector("#randomWords");
    const movies = document.querySelector("#movies");
    const TVShows = document.querySelector("#TV-shows");

    if(randomWords.checked){
        filteredWords.push(...fetchArray("random"));
    }
    if(movies.checked){
        filteredWords.push(...fetchArray("movie"));
    }
    if(TVShows.checked){
        filteredWords.push(...fetchArray("tvshow"));
    }
    if(filteredWords === []){
        return false;
    }
    return filteredWords;
}

function fetchArray(name){
    return words.filter(val => val.category === name);
}

function makeWordArr(word){
    const regex = /[a-z]/g;
    return word.replaceAll(regex, "_").split("");


}

export function Pickword(){
    const wordList = fetchWords();
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    word.word = word.word.toLowerCase();
    word.underscores = makeWordArr(word.word);
    return word;
}

