import * as wordLib from './localwordlib.mjs';
import * as domLib from './domlib.mjs';


let livesCounter;
let lives;
let win;
let usedLetters;
let hint = false;
let word;


export function init() {
  domLib.createKeyboard();
  addEventListeners();
  reset();
}

function addEventListeners() {
  // screen keyboard listeners
  const keyButtons = document.querySelectorAll('.letterBoxStyle');
  for (let i = 0; i < keyButtons.length; i++) {
    keyButtons[i].addEventListener('click', () => { turn(keyButtons[i].id); });
  }

  // real keyboard
  document.addEventListener('keydown', (e) => {
    if (/[a-z]/.test(e.key) && e.key.length === 1) {
      turn(e.key);
    }
  });

  // replay button
  const replay = document.querySelector('#replay');
  replay.addEventListener('click', reset);

  // settings
  const settingsLinks = document.querySelectorAll('#settingLink');
  const startBtn = document.querySelector('#startBtn');
  for (let i = 0; i < settingsLinks.length; i++) {
    settingsLinks[i].addEventListener('click', () => { domLib.toggleSettings(true); });
  }
  startBtn.addEventListener('click', reset);
}

function setLives() {
  const elem4 = document.querySelector('#lives4').checked;
  const elem8 = document.querySelector('#lives8').checked;
  const elem12 = document.querySelector('#lives12').checked;

  if (elem4 === true) {
    lives = 4;
    livesCounter = 4;
  } else if (elem8 === true) {
    lives = 8;
    livesCounter = 8;
  } else if (elem12 === true) {
    lives = 12;
    livesCounter = 12;
  }
}

function reset() {
  const endPage = document.querySelector('#end');
  // reset keyboard
  const keys = document.querySelectorAll('.letterBoxStyle');
  for (let i = 0; i < keys.length; i++) {
    keys[i].className = 'letterBoxStyle BtnStyle';
  }
  // reset word
  const wordBox = document.querySelector('#wordBox');
  wordBox.className = '';

  win = false;
  usedLetters = [];
  endPage.classList.add('invis');

  startGame();
}

async function startGame() {
  domLib.toggleSettings(false);
  word = await wordLib.fetchWords();
  hint = document.querySelector('#hintTrue').checked;
  setLives();
  domLib.updateDom(lives, livesCounter, word.underscore);
}

async function turn(letter) {
  if (usedLetters.includes(letter)) { return; }
  if (!word) { return; }

  usedLetters.push(letter);
  const OldUnderscour = [];
  for (const item of word.underscore) {
    OldUnderscour.push(item);
  }

  const query = `underscore=${word.underscore.join('')}&wordID=${word.id}&letter=${letter}`;
  const returnWord = await (await fetch(`turn?${query}`)).json();

  word.underscore = returnWord.userUnderscore;

  if (OldUnderscour.join('') === word.underscore.join('')) {
    domLib.updateLetter(false, letter);
    livesCounter -= 1;
  } else {
    domLib.updateLetter(true, letter);
  }

  // end of turn
  domLib.updateDom(lives, livesCounter, word.underscore, hint, word.def);

  win = returnWord.win;
  if (win) {
    document.addEventListener('keydown', (e) => { if (e.key === 'Enter') { reset(); } }, { once: true });

    domLib.end(word.underscore.join(''), win);
    word = '';
  } else if (livesCounter <= 0) {
    document.addEventListener('keydown', (e) => { if (e.key === 'Enter') { reset(); } }, { once: true });
    domLib.end(word.underscore.join(''), win);
    word = '';
  }
}
