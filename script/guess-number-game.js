(() => {
  const rangeSelect = document.getElementById('rangeSelect');
  const startBtn = document.getElementById('startBtn');
  const gameArea = document.getElementById('gameArea');
  const rangeDisplay = document.getElementById('rangeDisplay');
  const guessInput = document.getElementById('guessInput');
  const guessBtn = document.getElementById('guessBtn');
  const feedback = document.getElementById('feedback');
  const attemptsP = document.getElementById('attempts');
  const resetBtn = document.getElementById('resetBtn');

  let secretNumber = null;
  let min = 1;
  let max = 10;
  let attempts = 0;
  let gameActive = false;

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function startGame() {
    attempts = 0;
    feedback.textContent = '';
    attemptsP.textContent = '';
    guessInput.value = '';
    guessInput.disabled = false;
    guessBtn.disabled = false;
    resetBtn.style.display = 'none';

    const selectedRange = rangeSelect.value;

    switch(selectedRange) {
      case '10':
        min = 1;
        max = 10;
        break;
      case '100':
        min = 1;
        max = 100;
        break;
      case '1000':
        min = 1;
        max = 1000;
        break;
      case '10000':
        min = 1;
        max = 10000;
        break;
      case '100000':
        min = 1;
        max = 100000;
        break;
      case 'random':
        min = 1;
        max = 1000000;
        break;
      default:
        min = 1;
        max = 100;
    }

    secretNumber = getRandomIntInclusive(min, max);
    gameActive = true;

    rangeDisplay.textContent = `${min} and ${max}`;
    gameArea.style.display = 'block';
    guessInput.focus();
  }

  function checkGuess() {
    if(!gameActive) return;

    let guess = parseInt(guessInput.value, 10);

    if (isNaN(guess)) {
      feedback.textContent = 'Please enter a valid number.';
      return;
    }
    if (guess < min || guess > max) {
      feedback.textContent = `Your guess is out of range! Enter a number between ${min} and ${max}.`;
      return;
    }

    attempts++;
    if (guess === secretNumber) {
      feedback.textContent = `🎉 Correct! The number was ${secretNumber}. You guessed it in ${attempts} ${attempts === 1 ? 'try' : 'tries'}.`;
      guessInput.disabled = true;
      guessBtn.disabled = true;
      resetBtn.style.display = 'block';
      gameActive = false;
    } else if (guess < secretNumber) {
      feedback.textContent = 'Higher.';
    } else {
      feedback.textContent = 'Lower.';
    }

    attemptsP.textContent = `Attempts: ${attempts}`;
    guessInput.value = '';
    guessInput.focus();
  }

  startBtn.addEventListener('click', startGame);
  guessBtn.addEventListener('click', checkGuess);
  guessInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      checkGuess();
    }
  });
  resetBtn.addEventListener('click', startGame);

})();