import { response } from "express";
import {words} from "./words.mjs";


function fetchWords(randomWords, movies, TVShows){
    let filteredWords = [];

    if(randomWords){
        filteredWords.push(...fetchArray("random"));
    }
    if(movies){
        filteredWords.push(...fetchArray("movie"));
    }
    if(TVShows){
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
    const regexLetters = /[a-z]/g;
    let result = word.replace(regexLetters, "_");
    return result.split("");

}

function formatWord(word){
    let result = word.toLowerCase();    
    return result.replace(/\s/g, "-");;
}

export function pickWord(req, res){
    const wordList = fetchWords(req.body.randomWords, req.body.movies, req.body.TVShows);
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    word.word = formatWord(word.word);
    word.underscores = makeWordArr(word.word);
    res.json(word)
}

