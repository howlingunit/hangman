

export async function fetchWords(){
    const randomWords = document.querySelector("#randomWords");
    const movies = document.querySelector("#movies");
    const TVShows = document.querySelector("#TV-shows");

    const payload = {
        randomWords : randomWords.checked,
        movies : movies.checked,
        TVShows : TVShows.checked,
    }


    const response = await fetch("getword", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(payload)
    });

    if(response.ok){
        const word = await response.json();
        return word;
    } else{
        console.log("svr error");
        return "error";
    }
}
