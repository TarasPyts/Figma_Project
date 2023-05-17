import questions from './questions.js';
import textConstants from './variables.js';

const menu = document.getElementById('menu');
const menuIcon = document.getElementById('menu-icon');
const closeMenuIcon = document.getElementById('close-icon');
const headerHeading = document.querySelector('.header_text');
const container = document.querySelectorAll('.container');
const container2 = document.querySelectorAll('.container2');
const headerImg = document.querySelector('.header_image');
const linkMain = document.getElementById('main_link');
const info = document.getElementById('info');
const buttons = document.querySelectorAll('.button');
const goToTest = document.getElementById('go_to_test');
const answers = [];
const questionEl = document.getElementById('question');
const optionsEl = document.querySelector('.options');
const nextButton = document.getElementById('next_grey');
const line = document.querySelector('.line');
const lineContainer = document.querySelector('.line-container');
const loadingPage = document.createElement('div');
const textContainerOne = document.querySelector('.text_container_one');
const heading = textContainerOne.querySelector('h5');
let currentQuestionIndex = 0;

heading.addEventListener('click', function () {
  window.scrollTo(0, document.body.scrollHeight);
});

goToTest.addEventListener('click', function () {
  currentQuestionIndex = 0;
  optionsEl.classList.remove('finish_style');
  changeContentVisibility('none', 'grid', 'block', 'block');
  nextButton.style.display = 'block';
  lineContainer.style.display = 'grid';
  headerHeading.textContent = 'ТЕСТ НА ОПРЕДЕЛЕНИЕ IQ';
  updateQuestion();
  closemenu();
});

menuIcon.addEventListener('click', () => openmenu());
closeMenuIcon.addEventListener('click', () => closemenu());

info.addEventListener('click', function () {
  closemenu();

  goToTest.click();
  showFinishScreen();
});

linkMain.addEventListener('click', function () {
  closemenu();
  changeContentVisibility('grid', 'none', 'none', 'none');
});

buttons.forEach((btn) => {
  btn.addEventListener('click', () => goToTest.click());
});

function openmenu() {
  menu.style.left = '0';
}

function closemenu() {
  menu.style.left = '-110%';
}

function changeContentVisibility(
  containerVisibility,
  container2Visibility,
  headerImgVisibility,
  headerHeadingVisibility
) {
  container.forEach((c) => (c.style.display = containerVisibility));
  container2.forEach((c) => (c.style.display = container2Visibility));
  headerImg.style.display = headerImgVisibility;
  headerHeading.style.display = headerHeadingVisibility;
}

function updateQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  const currentOptions = currentQuestion.options;

  questionEl.textContent = currentQuestion.question;

  optionsEl.innerHTML = '';

  if (currentQuestionIndex === 4) {
    optionsEl.classList.add('question4_style');

    currentOptions.forEach((option, index) => {
      optionsEl.appendChild(createColoredSquare(option));
    });
  } else if (currentQuestionIndex === 6) {
    optionsEl.classList.add('question6_style');

    createImage(1);
    createDivWithSquares(currentOptions);
  } else if (currentQuestionIndex === 8) {
    optionsEl.classList.add('question8_style');

    createImage(3);
    inputContainerMaker();
  } else if (currentQuestionIndex === 9) {
    optionsEl.classList.replace('question8_style', 'question9_style');

    createImage(2);

    const lineDivEl = document.createElement('div');
    lineDivEl.classList.add('horizontal-line');
    optionsEl.appendChild(lineDivEl);

    createDivWithSquares(currentOptions);
  } else {
    optionsEl.classList.remove(
      'question4_style',
      'question6_style',
      'question8_style'
    );

    inputContainerMaker();
  }
}

function createDivWithSquares(options) {
  const div2El = document.createElement('div');
  optionsEl.appendChild(div2El);

  for (let i = 0; i < options.length; i++) {
    const squareEl = document.createElement('div');
    squareEl.innerHTML = options[i];
    div2El.appendChild(squareEl);
    squareEl.addEventListener('click', handleOptionClick);
  }
}

function inputContainerMaker() {
  const currentQuestion = questions[currentQuestionIndex];
  const currentOptions = currentQuestion.options;
  for (let i = 0; i < currentOptions.length; i++) {
    const option = currentOptions[i];
    const label = document.createElement('label');

    label.innerHTML = option;

    const pairContainer = document.createElement('div');

    pairContainer.appendChild(label);
    optionsEl.appendChild(pairContainer);

    pairContainer.addEventListener('click', handleOptionClick);
  }
}

let selectedOption;

function handleOptionClick(event) {
  selectedOption = event.target.textContent;

  const divs = optionsEl.querySelectorAll('.options div');
  divs.forEach((s) => s.classList.remove('selected'));
  event.currentTarget.classList.add('selected');

  nextButton.disabled = false;
}

function createColoredSquare(color) {
  const square = document.createElement('div');
  square.style.backgroundColor = color;
  square.addEventListener('click', () => {
    const squares = document.querySelectorAll('.question4_style div');
    squares.forEach((s) => s.classList.remove('selected'));

    // Add the 'selected' class to the clicked square
    square.classList.add('selected');

    selectedOption = square.style.backgroundColor;
    nextButton.disabled = false;
  });
  return square;
}

function handleNextButtonClick() {
  if (selectedOption) {
    currentQuestionIndex++;

    answers.push(selectedOption);

    if (currentQuestionIndex !== questions.length) {
      updateQuestion();
    } else {
      showLoadingScreen();
    }

    const lineWidth =
      ((currentQuestionIndex + 1) / (questions.length + 1)) * 100;
    line.style.width = `${lineWidth}%`;
    selectedOption = null;

    nextButton.disabled = true;
  }
}

function replaceQuestionEl(text) {
  questionEl.innerHTML = '';
  optionsEl.innerHTML = '';

  const divEl = document.createElement('div');
  const h3El = document.createElement('h2');
  h3El.textContent = text;
  divEl.appendChild(h3El);
  questionEl.appendChild(divEl);
}

function replaceOptionsEl(text) {
  const divEl = document.createElement('div');
  const h4El = document.createElement('h5');
  h4El.textContent = text;
  divEl.appendChild(h4El);
  optionsEl.appendChild(divEl);
}

function createImage(imageNumber) {
  const divEl = document.createElement('div');
  const imgEl = document.createElement('img');
  imgEl.src = `styles/image(${imageNumber}).png`;
  imgEl.alt = `image(${imageNumber}).png`;
  divEl.appendChild(imgEl);
  optionsEl.appendChild(divEl);
}

function showLoadingScreen() {
  line.style.width = '100%';
  nextButton.style.display = 'none';
  optionsEl.classList.replace('question9_style', 'loader_style');
  loadingPage.classList.add('loader');

  replaceQuestionEl(textConstants.RESULT_PROCESSING);

  optionsEl.appendChild(loadingPage);

  replaceOptionsEl(textConstants.THINKING_DETERMINATION);

  setTimeout(function () {
    showFinishScreen();
  }, 3000);
}

function showFinishScreen() {
  optionsEl.classList.remove('loader_style');
  optionsEl.classList.add('finish_style');
  nextButton.style.display = 'none';
  lineContainer.style.display = 'none';
  headerHeading.textContent = 'ГОТОВО!';

  replaceQuestionEl();
  replaceOptionsEl(textConstants.RESULT_CALCULATION);
  replaceOptionsEl(textConstants.PERSON_RELATION);
  replaceOptionsEl(textConstants.RESULT_RECEIVING);
  replaceOptionsEl(textConstants.RESULT_ACCESS);
  replaceOptionsEl(textConstants.RESULT_AVAILABLE);

  const divEl = document.createElement('div');
  const pEl = document.createElement('p');
  pEl.classList.add('demo');
  divEl.appendChild(pEl);
  optionsEl.appendChild(divEl);

  const div1El = document.createElement('div');
  const imgEl = document.createElement('img');
  imgEl.src = `styles/image(4).png`;
  imgEl.alt = `image(4).png`;
  div1El.appendChild(imgEl);
  const h4El = document.createElement('h5');
  h4El.textContent = textConstants.CALL_TO_GET_RESULT;
  div1El.appendChild(h4El);
  optionsEl.appendChild(div1El);

  replaceOptionsEl(textConstants.QUOTE);

  createImage(5);
  createImage(6);

  const parentDiv = document.querySelector('.finish_style');
  const childDivs = parentDiv.querySelectorAll('div');
  const fifthDiv = childDivs[6];

  fifthDiv.addEventListener('click', () => {
    fetch('https://swapi.dev/api/people/1/')
      .then((response) => response.json())
      .then((data) => {
        replaceQuestionEl(`Your result:`);
        replaceOptionsEl(`Hello ${data.name}`);
        replaceOptionsEl(`Your height is: ${data.height} cm`);
        replaceOptionsEl(`Your mass is: ${data.mass} kg`);
        replaceOptionsEl(`Your hair color is: ${data.hair_color}`);
        replaceOptionsEl(`Your skin color is: ${data.skin_color}`);
        replaceOptionsEl(`Your eye color is: ${data.eye_color}`);
      })
      .catch((error) => {
        console.log('An error occurred:', error);
      });
  });

  const countDownDate = new Date(Date.now() + 600000).getTime();
  const x = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    pEl.textContent = `${minutes}:${seconds} минут`;
    if (distance < 1000) {
      clearInterval(x);
      linkMain.click();
    }
  }, 1000);
}

nextButton.addEventListener('click', handleNextButtonClick);

updateQuestion();
