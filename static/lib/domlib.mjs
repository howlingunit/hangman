export function navBarSetup() {
  const burgerButton = document.querySelector('.burgerBtn');
  burgerButton.addEventListener('click', navBar);
}

export function navBar() {
  const nav = document.querySelector('.small');
  const navLinks = document.querySelector('.navLinks');
  if (navLinks.classList.contains('navLinksOpen')) {
    navLinks.classList.remove('navLinksOpen');
    nav.classList.remove('smallOpen');
    return;
  }
  navLinks.classList.add('navLinksOpen');
  nav.classList.add('smallOpen');
}

export function toggleSettings(toggle) {
  const overlay = document.querySelector('#overlay');
  const applyButton = document.querySelector('#startBtn');
  const categoryErrorText = document.querySelector('#categoryErrorText');

  applyButton.classList.remove('invalidWord');
  categoryErrorText.classList.add('invis');

  if (toggle) {
    overlay.style.display = 'flex';
  } else {
    overlay.style.display = 'none';
  }
}

export function createKeyboard() {
  const keys = ['nl', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'nl', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'nl', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
  const keyboardDiv = document.querySelector('#keyboard');
  let currentLine;
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] === 'nl') {
      currentLine = document.createElement('div');
      currentLine.classList.add('lineStyle');
      keyboardDiv.appendChild(currentLine);
    } else {
      const letterBox = document.createElement('button');
      const letter = document.createElement('p');
      letter.classList.add('letterStyle');
      letter.textContent = keys[i];
      letterBox.appendChild(letter);
      letterBox.classList.add('letterBoxStyle');
      letterBox.classList.add('BtnStyle');
      letterBox.id = keys[i];
      letterBox.tabIndex = '0';
      currentLine.appendChild(letterBox);
    }
  }
}

function deactivateKeyboard() {
  const keys = document.querySelectorAll('.letterBoxStyle');
  for (let i = 0; i < keys.length; i++) {
    if (keys[i].classList.contains('incorrectLetter') || keys[i].classList.contains('correctLetter')) { continue; }
    keys[i].classList.add('disabledLetter');
  }
}

export function updateLetter(correct, letter) {
  const letters = document.querySelectorAll('.letterBoxStyle');
  for (let i = 0; i < letters.length; i++) {
    if (letters[i].id === letter && correct) {
      letters[i].classList.add('correctLetter');
      return;
    } else if (letters[i].id === letter && !(correct)) {
      letters[i].classList.add('incorrectLetter');
    }
  }
}

export function updateDom(lives, livesCounter, underscores, hint, wordDef) {
  const playPage = document.querySelector('#playing');
  const HangPic = document.querySelector('#HangPic');
  const hintP = document.querySelector('#hintP');
  const wordBox = document.querySelector('#wordBox');

  playPage.classList.remove('invis');
  wordBox.textContent = underscores.join('');
  HangPic.src = `assets/${lives}/${lives - livesCounter}.png`;
  HangPic.alt = `The hang-man picture with ${livesCounter} lives left`;
  hintP.textContent = '';
  if (hint && livesCounter < lives / 2) {
    hintP.tabIndex = '0';
    hintP.textContent = `Hint: ${wordDef}`;
  }
}

export function end(completeWord, win) {
  const endPage = document.querySelector('#end');
  const wordBox = document.querySelector('#wordBox');
  deactivateKeyboard();
  endPage.classList.remove('invis');
  if (!win) {
    wordBox.textContent = completeWord;
    wordBox.classList.add('incorrectWord');
  } else {
    wordBox.classList.add('correctWord');
  }
}

export function noCategory() {
  const applyButton = document.querySelector('#startBtn');
  const categoryErrorText = document.querySelector('#categoryErrorText');
  applyButton.classList.add('invalidWord');

  categoryErrorText.classList.remove('invis');
}
