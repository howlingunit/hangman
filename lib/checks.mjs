export function userSubmitCheck(word) {
  if (word.word.length > 2) {
    return { status: false, error: 'word too short' };
  }
  if (/^[0-9!@#\$%\^\&*\)\(+=._-]+$/g.test(word.word)) {
    return { status: false, error: 'Word contains invalid characters' };
  }
  if (word.def.length > 500) {
    return { status: false, error: 'hint is too long, must be less than 500 characters' };
  }
}
