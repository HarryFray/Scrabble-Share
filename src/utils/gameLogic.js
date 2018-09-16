export function getRandomLetter(chars) {
  let randIndex = Math.floor(Math.random() * chars.length);
  return chars[randIndex];
}

export function generateRandomLetters() {
  let consonants = 'BCDFGHJKLMNPQRSTVWXZ';
  let vowels = 'AEIOUY';
  let allLetters = vowels + consonants;
  let letters = [];
  for (let i = 0; i < 9; i++) {
    if (i < 2) {
      letters.push(getRandomLetter(vowels));
    } else if (i < 4) {
      letters.push(getRandomLetter(consonants));
    } else {
      letters.push(getRandomLetter(allLetters));
    }
  }
  return letters;
}

export function checkIfWordInLetters(word, letters) {
  let bigWord = word.toUpperCase();
  let tempLetters = letters.toUpperCase();
  for (let i = 0; i < word.length; i++) {
    let current = bigWord[i];
    if (!tempLetters.includes(current)) {
      return false;
    }
    var regex = new RegExp(current);
    tempLetters = tempLetters.replace(regex, '');
  }
  return true;
}
