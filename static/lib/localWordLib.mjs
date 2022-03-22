

export async function fetchWords() {
  const elemRandomWords = document.querySelector('#randomWords');
  const elemMovies = document.querySelector('#movies');
  const elemTVShows = document.querySelector('#TV-shows');
  const elemUsers = document.querySelector('#userSubmited');

  const urlPrams = `words=${elemRandomWords.checked},${elemMovies.checked}&tvshow=${elemTVShows.checked}&user=${elemUsers.checked}`;

  const response = await fetch(`word/?${urlPrams}`);

  if (response.ok) {
    return await response.json();
  } else {
    console.error(`svr error Code:${response.code}`);
    return 'error';
  }
}
