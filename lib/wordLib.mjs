let underscores;
let completeWord;
let userWord;

export function getList(){
    const movies = ["jurassic park","lord of the rings ","mission imposible","anchorman","groundhog day","fantastic mr fox","harry potter","shrek","how to train your dragon","jumanji","inception","the matrix","interstellar","batman the dark night","tenet","john wick","back to the future","godzilla vs kong","the shining","the terminal","cast away","labyrinth","hot fuzz","shaun of the dead","worlds end","spirited away","bee movie"];
    const randomWords = ["news","requirement","formal","manage","depart","definite","ridge","content","fragment","integrity","humanity","jazz","hangman","confuse","sunrise"];
    const TVShows = ["stranger things","friends","how i met your mother","the mandalorian","sherlock","the umbrella acadamy","community","the good place","the it crowd","dirk gentlys holistic detective agency","queens gambit","star trek","black mirror","the office","brooklyn nine nine","avatar the last air bender","santa clarita diet"];

    return [movies, TVShows, randomWords];
}

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
    const [movies, TVShows, randomWords] = getList();
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

export function Pickword(){
    const wordList = fetchWords();
    // const wordList = ["delay","correct","lick","whine","paste","grab","rejoice","work","manage","scatter","dare","cry","queue","type","increase","arrange","trust","order","report","invite","search","fail","scare","disagree","tame","start","spell","expect","pause","separate","walk","hug","prevent","recognise","inform","shade","drip","consider","pass","flood","bow","pat","introduce","tap","approve","worry","coil","contain","suspect","agree","improve","park","obtain","produce","develop","surprise","saw","reproduce","need","point","colour","clear","bleach","suppose","satisfy","intend","untidy","reduce","laugh","lighten","bubble","handle","alert","stamp","suffer","deserve","jump","slap","hop","switch","mark","behave","juggle","unpack","scorch","grin","end","hover","serve","wish","arrest","scream","compare","blind","wave","tie","provide","slow","rhyme","admit"];
    // const wordList = ["test", "test2", "test3", "test4", "and", "so", "on"];
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    const [underscores, completeWord, userWord] = makeWordArr(word);
    return [underscores, completeWord, userWord];
}

function makeWordArr(word){
    underscores = [];
    completeWord = [];
    userWord = [];
    for(const item of word){
        if (item === " "){
            underscores.push(",");
            userWord.push(",");
        } else {
            underscores.push("_");
            userWord.push(item);
        }
        completeWord.push(item);
    }
    return [underscores, completeWord, userWord];
}