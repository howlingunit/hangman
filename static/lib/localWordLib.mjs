

export async function fetchWords() {
  const elemRandomWords = document.querySelector('#randomWords');
  const elemMovies = document.querySelector('#movies');
  const elemTVShows = document.querySelector('#TV-shows');
  const elemUsers = document.querySelector('#userSubmited');

  const wordTypes = [];

  if (elemRandomWords.checked) { wordTypes.push('random'); }
  if (elemMovies.checked) { wordTypes.push('movie'); }
  if (elemTVShows.checked) { wordTypes.push('tvshow'); }
  if (elemUsers.checked) { wordTypes.push('user'); }

  const urlPrams = `words=${wordTypes.join(',')}`;

  const response = await fetch(`word/?${urlPrams}`);

  if (response.ok) {
    return await response.json();
  } else {
    console.error(`svr error Code:${response.code}`);
    return 'error';
  }
}
