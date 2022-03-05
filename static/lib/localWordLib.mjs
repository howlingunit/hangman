

export async function fetchWords() {
  const elemRandomWords = document.querySelector('#randomWords');
  const elemMovies = document.querySelector('#movies');
  const elemTVShows = document.querySelector('#TV-shows');

  const payload = [];

  if (elemRandomWords.checked) { payload.push('random'); }
  if (elemMovies.checked) { payload.push('movie'); }
  if (elemTVShows.checked) { payload.push('tvshow'); }


  const response = await fetch('getword', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    return await response.json();
  } else {
    console.error(`svr error Code:${response.code}`);
    return 'error';
  }
}
