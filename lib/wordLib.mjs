import { response } from "express";
import {words} from "./words.mjs";


function getWord(randomWords, movies, TVShows){
    let filteredWords = [];

    if(randomWords){
        filteredWords.push(...words.filter(val => val.category === "random"));
    }
    if(movies){
        filteredWords.push(...words.filter(val => val.category === "movie"));
    }
    if(TVShows){
        filteredWords.push(...words.filter(val => val.category === "tvshow"));
    }
    if(filteredWords === []){
        return false;
    }
    return filteredWords[Math.floor(Math.random() * filteredWords.length)];
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
    const word = getWord(req.body.randomWords, req.body.movies, req.body.TVShows);
    word.word = formatWord(word.word);
    word.underscores = makeUnderscores(word.word);
    res.json(word)
}

