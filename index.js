import questions from './questions.js';
import vars from './variables.js';

const menu = document.getElementById('menu');
const menuIcon = document.getElementById('menu-icon');
const closeMenuIcon = document.getElementById('close-icon');
const headerHeading = document.querySelector('.header_text');
const container = document.querySelectorAll('.container');
const container2 = document.querySelectorAll('.container2');
const headerImg = document.querySelector('.header_image');
const linkMain = document.getElementById('main_link');
const buttons = document.querySelectorAll('.button');
const goToTest = document.getElementById('go_to_test');
const answers = [];
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextButton = document.getElementById('next_grey');
const line = document.querySelector('.line');
const lineContainer = document.querySelector('.line-container');
const loadingPage = document.createElement('div');

goToTest.addEventListener('click', function () {
  closemenu();
  changeContentVisibility('none', 'grid', 'block', 'block');
});

menuIcon.addEventListener('click', () => openmenu());
closeMenuIcon.addEventListener('click', () => closemenu());

linkMain.addEventListener('click', function () {
  closemenu();
  changeContentVisibility('grid', 'none', 'none', 'none');
});

buttons.forEach((btn) => {
  btn.addEventListener('click', () =>
    changeContentVisibility('none', 'grid', 'block', 'block')
  );
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

let currentQuestionIndex = 0;

function updateQuestion() {
  if (currentQuestionIndex === questions.length) {
    return;
  }

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
    optionsEl.classList.replace('question8_style', 'question6_style');

    createImage(2);

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
    const input = document.createElement('input');

    input.type = 'radio';
    input.value = option;
    input.innerHTML = option;
    input.id = 'option' + i;
    input.name = 'question';
    label.for = input.id;
    label.innerHTML = option;

    const pairContainer = document.createElement('div');
    const inputContainer = document.createElement('div');

    pairContainer.appendChild(input);
    pairContainer.appendChild(label);
    inputContainer.appendChild(pairContainer);
    optionsEl.appendChild(inputContainer);

    pairContainer.addEventListener('click', handleOptionClick);
  }
}

let selectedOption;

function handleOptionClick(event) {
  // Check if the event target is an input element
  if (event.target.tagName === 'INPUT') {
    // Set the selected option and check the input element
    selectedOption = event.target.value;
    event.target.checked = true;
  }
  // Check if the event target is a div element
  else if (event.target.tagName === 'DIV') {
    selectedOption = event.target.textContent;
  }

  const divs = optionsEl.querySelectorAll('#options div');
  divs.forEach((s) => s.classList.remove('selected'));

  // Add the 'selected' class to the clicked div element
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
    console.log(selectedOption);
  });
  return square;
}

function handleNextButtonClick() {
  if (selectedOption) {
    currentQuestionIndex++;

    answers.push(selectedOption);

    if (currentQuestionIndex === questions.length) {
      showLoadingScreen();
    }

    updateQuestion();
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
  const h3El = document.createElement('h3');
  h3El.textContent = text;
  divEl.appendChild(h3El);
  questionEl.appendChild(divEl);
}

function replaceOptionsEl(text) {
  const divEl = document.createElement('div');
  const h4El = document.createElement('h4');
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
  optionsEl.classList.replace('question6_style', 'loader_style');
  loadingPage.classList.add('loader');

  replaceQuestionEl(vars.a);

  optionsEl.appendChild(loadingPage);

  replaceOptionsEl(vars.b);

  setTimeout(function () {
    showFinishScreen();
  }, 3000);
}

function showFinishScreen() {
  optionsEl.classList.replace('loader_style', 'finish_style');
  lineContainer.style.display = 'none';
  headerHeading.textContent = 'ГОТОВО!';

  replaceQuestionEl(vars.c);
  replaceOptionsEl(vars.d);
  replaceOptionsEl(vars.e);
  replaceOptionsEl(vars.f);
  replaceOptionsEl(vars.g);
  replaceOptionsEl(vars.h);

  const imgEl = document.createElement('img');
  imgEl.src = 'styles/call(2).png';
  imgEl.alt = 'call(2).png';
  imgEl.width = 28.63;
  imgEl.height = 27.29;
  imgEl.style.cursor = 'pointer';
  optionsEl.appendChild(imgEl);

  replaceOptionsEl(vars.i);
}
nextButton.addEventListener('click', handleNextButtonClick);

updateQuestion();
