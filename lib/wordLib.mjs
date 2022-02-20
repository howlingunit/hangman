import { response } from "express";
import {words} from "./words.mjs";


function getWords(randomWords, movies, TVShows){
    let filteredWords = [];

    if(randomWords){
        filteredWords.push(...words.filter(val => val.category === "random"));
    }
    if(movies){
        filteredWords.push(...words.filter(val => val.category === "movie"));
    }
    if(TVShows){
        filteredWords.push(...words.filter(val => val.category === "TVshow"));
    }
    if(filteredWords === []){
        return false;
    }
    return filteredWords;
}

function makeUnderscores(word){
    const regexLetters = /[a-z]/g;
    let result = word.replace(regexLetters, "_");
    return result.split("");

}
function formatWord(word){
    let result = word.toLowerCase();    
    return result.replace(/\s/g, "-");
}

export function pickWord(req, res){
    const wordList = getWords(req.body.randomWords, req.body.movies, req.body.TVShows);
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    word.word = formatWord(word.word);
    word.underscores = makeUnderscores(word.word);
    res.json(word)
}

