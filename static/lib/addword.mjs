import * as domLib from './domlib.mjs';

domLib.navBarSetup();
eventListeners();

function eventListeners() {
  const subButton = document.querySelector('#subNewWord');
  subButton.addEventListener('click', sendWord);
}

async function sendWord() {
  const word = document.querySelector('#newWord');
  const def = document.querySelector('#newHint');
  const responseText = document.querySelector('#responseText');
  const subButton = document.querySelector('#subNewWord');


  const payload = { word: word.value, def: def.value };

  const response = await fetch('/addWord', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (await response.ok) {
    subButton.classList.remove('invalidWord');
    subButton.classList.add('validWord');
    word.value = '';
    def.value = '';
    responseText.textContent = 'Your word has been added!';
  } else {
    responseText.textContent = await response.json();
    subButton.classList.remove('validWord');
    subButton.classList.add('invalidWord');
  }
}
