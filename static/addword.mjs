import * as domLib from './lib/domLib.mjs';

domLib.navBarSetup();
eventListeners();

function eventListeners() {
  const subButton = document.querySelector('#subNewWord');
  subButton.addEventListener('click', sendWord);
}

async function sendWord() {
  const word = document.querySelector('#newWord').value;
  const def = document.querySelector('#newHint').value;
  const responseText = document.querySelector('#responseText');

  const payload = { word, def };

  const response = await fetch('/submitWord', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (await response.ok) {
    responseText.textContent = 'ok!';
  } else {
    responseText.textContent = await response.json();
  }
}
