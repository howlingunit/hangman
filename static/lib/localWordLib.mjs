

export async function fetchWords() {
  const elemRandomWords = document.querySelector('#randomWords');
  const elemMovies = document.querySelector('#movies');
  const elemTVShows = document.querySelector('#TV-shows');

  const payload = {
    randomWords: elemRandomWords.checked,
    movies: elemMovies.checked,
    TVShows: elemTVShows.checked,
  };
  const urlPrams = `${elemRandomWords.checked}.${elemMovies.checked}.${elemTVShows.checked}.false`;


  const response = await fetch(`word/${urlPrams}`);

  if (response.ok) {
    return await response.json();
  } else {
    console.error(`svr error Code:${response.code}`);
    return 'error';
  }
}
