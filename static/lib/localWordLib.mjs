

export async function fetchWords() {
  const elemRandomWords = document.querySelector('#randomWords');
  const elemMovies = document.querySelector('#movies');
  const elemTVShows = document.querySelector('#TV-shows');

  const urlPrams = `random=${elemRandomWords.checked}&movie=${elemMovies.checked}&tvshow=${elemTVShows.checked}&user=false`;

  const response = await fetch(`word/?${urlPrams}`);

  if (response.ok) {
    return await response.json();
  } else {
    console.error(`svr error Code:${response.code}`);
    return 'error';
  }
}
