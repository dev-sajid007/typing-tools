const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput")
const timerElement = document.getElementById('timer')

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');
    let correct = true;

    arrayQuote.forEach((charSpan, index) => {
        const character = arrayValue[index];
        if (character == null) {
            charSpan.classList.remove('correct');
            charSpan.classList.remove('incorrect');
            correct = false;
        } else if (character === charSpan.innerText) {
            charSpan.classList.add('correct');
            charSpan.classList.remove('incorrect');
        } else {
            charSpan.classList.remove('correct');
            charSpan.classList.add('incorrect');
            correct = false;
        }
    });

    if(correct) renderNewQuote();
});




async function renderNewQuote() {
    let quote = await getRandomQuote();
    quoteDisplayElement.innerText = "";

    quote.split('').forEach((character) => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
    });

    quoteInputElement.value = null;
    startTimer();
}

//start timer
let startTime
function startTimer() {
  timerElement.innerText = 0
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote();