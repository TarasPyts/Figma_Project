const menu = document.getElementById('menu');

function openmenu() {
  document.getElementById('menu').style.left = '0';
}

function closemenu() {
  document.getElementById('menu').style.left = '-110%';
}

const linkMain = document.getElementById('main_link');
linkMain.addEventListener('click', closemenu);

const goToTest = document.getElementById('go_to_test');
goToTest.addEventListener('click', function () {
  closemenu();
  hideContent();
});

const btn1 = document.getElementById('myButton1');
const btn2 = document.getElementById('myButton2');
const btn3 = document.getElementById('myButton3');

btn1.addEventListener('click', hideContent);
btn2.addEventListener('click', hideContent);
btn3.addEventListener('click', hideContent);

function hideContent() {
  const container = document.querySelectorAll('.container');
  const container2 = document.querySelectorAll('.container2');
  const headerImg = document.querySelector('.image10');
  const headerHeading = document.querySelector('.text11');

  container.forEach((c) => (c.style.display = 'none'));
  container2.forEach((c) => (c.style.display = 'grid'));
  headerImg.style.display = 'block';
  headerHeading.style.display = 'block';
}

const questions = [
  {
    question: 'Ваш пол:',
    options: ['Мужчина', 'Женщина '],
  },
  {
    question: 'Укажите ваш возраст:',
    options: ['До 18', 'От 18 до 28', 'От 29 до 35', 'От 36 '],
  },
  {
    question: 'Виберите лишнее:',
    options: ['Дом', 'Шалаш', 'Бунгало', 'Скамейка', 'Хижина'],
  },
  {
    question: 'Продолжите числовой ряд: 18 20 24 32',
    options: ['62', '48', '74', '57', '60', '77'],
  },
  {
    question: 'Виберите цвет, которий сейчас наиболее вам приятен:',
    options: [
      '#A8A8A8',
      '#0000A9',
      '#00A701',
      '#F60100',
      '#FDFF19',
      '#A95403',
      '#000000',
      '#850068',
      '#46B2AC',
    ],
  },
  {
    question: 'Какой из шородов лишний?',
    options: ['Вашингтон', 'Лондон', 'Париж', 'Нью-Йорк', 'Москва', 'Оттава'],
  },
  {
    question: 'Виберите правильную фигуру из четирех пронумерованних.',
    options: ['1', '2', '3', '4'],
  },
  {
    question: 'Виберите привичнее и важнее:',
    options: [
      'Наслаждаться каждой минутой проведенного времени',
      'Бить устремленньми мислями в будущее',
      'учитивать в ежидневной практике проштий опит',
    ],
  },
  {
    question:
      'Какое определение, по-Вашему, больше подходит к єтому геометрическому изображению:',
    options: [
      'Оно остроконечное',
      'Оно устойчиво',
      'Оно-находится в состоянии равновесия',
    ],
  },
  {
    question: 'Вставьте подходящее число',
    options: ['34', '36', '53', '44', '66', '42'],
  },
  {
    question: 'Обработка результатов',
    options: [],
  },
  {
    question: 'ВАШ РЕЗУЛЬТАТ РАССЧИТАН:',
    options: [],
  },
];

let currentQuestionIndex = 0;

const answers = [];

// Get the elements
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextButton = document.getElementById('next_grey');
const line = document.querySelector('.line');

// Function to update the question and options
function updateQuestion() {
  // Get the current question and options
  const currentQuestion = questions[currentQuestionIndex];
  const currentOptions = currentQuestion.options;

  // Update the question text
  questionEl.textContent = currentQuestion.question;

  // Clear the options list
  optionsEl.innerHTML = '';

  if (currentQuestionIndex === 4) {
    console.log('hi');
    // const optionsList = document.getElementById('options');
    optionsEl.classList.add('question4_style');

    currentOptions.forEach((option, index) => {
      optionsEl.appendChild(createColoredSquare(option));
    });
  } else if (currentQuestionIndex === 6) {
    optionsEl.classList.add('question6_style');
    const imgEl = document.createElement('img');
    imgEl.src = 'styles/image(1).png';
    imgEl.alt = 'image(1).png';
    imgEl.width = 100;
    imgEl.height = 100;
    optionsEl.appendChild(imgEl);
    console.log(currentOptions);
    for (let i = 0; i < currentOptions.length; i++) {
      const squareEl = document.createElement('div');
      squareEl.style.width = '10px';
      squareEl.style.height = '10px';
      squareEl.style.backgroundColor = 'white';
      squareEl.style.cursor = 'pointer';
      squareEl.innerHTML = currentOptions[i];
      optionsEl.appendChild(squareEl);
      squareEl.addEventListener('click', handleOptionClick);
      console.log(selectedOption);
    }
  } else if (currentQuestionIndex === 8) {
    console.log('hi!');
    optionsEl.classList.add('question8_style');
    const imgEl = document.createElement('img');
    imgEl.src = 'styles/image(3).png';
    imgEl.alt = 'image(1).png';
    imgEl.width = 100;
    imgEl.height = 100;
    optionsEl.appendChild(imgEl);
    console.log(currentOptions);
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
      input.addEventListener('click', handleOptionClick);
      optionsEl.appendChild(input);
      optionsEl.appendChild(label);
    }
  } else if (currentQuestionIndex === 9) {
    optionsEl.classList.remove('question8_style');
    optionsEl.classList.add('question6_style');
    const imgEl = document.createElement('img');
    imgEl.src = 'styles/image2.png';
    imgEl.alt = 'image2.png';
    imgEl.width = 100;
    imgEl.height = 100;
    optionsEl.appendChild(imgEl);
    console.log(currentOptions);
    for (let i = 0; i < currentOptions.length; i++) {
      const squareEl = document.createElement('div');
      squareEl.style.width = '10px';
      squareEl.style.height = '10px';
      squareEl.style.backgroundColor = 'white';
      squareEl.style.cursor = 'pointer';
      squareEl.innerHTML = currentOptions[i];
      optionsEl.appendChild(squareEl);
      squareEl.addEventListener('click', handleOptionClick);
      console.log(selectedOption);
    }
  } else if (currentQuestionIndex === 10) {
    optionsEl.classList.remove('question6_style');
    nextButton.style.display = 'none';
    const loadingPage = document.createElement('div');
    loadingPage.classList.add('loader');
    optionsEl.appendChild(loadingPage);
    const textEl = document.createElement('p');
    textEl.textContent =
      'Определение стиля мишления..................................................................';
    optionsEl.appendChild(textEl);
    setTimeout(function () {
      currentQuestionIndex++;
      updateQuestion();
    }, 3000);
  } else if (currentQuestionIndex === 11) {
    console.log('hi!');
    const pText = document.createElement('p');
    pText.textContent =
      'Вы относитесь к 3% респондентов, чей уровень интеллекта более чем на 15 пунктов отличается от среднего в большую или меньшую сторону!';
    optionsEl.appendChild(pText);
    const pText2 = document.createElement('p');
    pText2.textContent = 'Скорее получите свой результат!';
    pText2.style.color = '#3BDE7C';
    pText2.style.fontSize = '18px';
    optionsEl.appendChild(pText2);
    const pText3 = document.createElement('p');
    pText3.textContent =
      'В целях защиты персональных данных результат теста, их подробная интерпретация и рекомендации доступны в виде голосового сообщения по звонку с вашего мобильного телефона';
    pText3.style.color = '#FFFFFF ';
    pText3.style.fontSize = '14px';
    pText3.style.backgroundColor = '#1C2741';
    pText3.style.padding = '20px';
    optionsEl.appendChild(pText3);
    const pText4 = document.createElement('p');
    pText4.textContent = 'Звоните скорее, запись доступна всего';
    pText4.style.color = '#3BDE7C ';
    pText4.style.fontSize = '11px';
    optionsEl.appendChild(pText4);
    const pText5 = document.createElement('p');
    pText5.textContent = '10:00 МИНУТ';
    pText5.style.color = '#3BDE7C ';
    pText5.style.fontSize = '30px';
    optionsEl.appendChild(pText5);

    // const squareEle = document.createElement('div');
    // squareEle.style.width = '290px';
    // squareEle.style.height = '92px';
    // squareEle.style.backgroundColor = '#EB1B00';
    // squareEle.innerHTML = currentOptions[i];
    // optionsEl.appendChild(squareEle);

    const imgEl = document.createElement('img');
    imgEl.src = 'styles/call(2).png';
    imgEl.alt = 'call(2).png';
    imgEl.width = 28.63;
    imgEl.height = 27.29;
    imgEl.style.cursor = 'pointer';
    optionsEl.appendChild(imgEl);

    const pText6 = document.createElement('p');
    pText6.textContent = 'Позвонить и прослушать результат';
    pText6.style.color = '#FFFFFF ';
    pText6.style.fontSize = '30px';
    pText6.style.padding = '20px';
    pText6.style.cursor = 'pointer';
    optionsEl.appendChild(pText6);
  } else {
    optionsEl.classList.remove('question4_style');
    optionsEl.classList.remove('question6_style');
    optionsEl.classList.remove('question8_style');
    // Add each option as a list item
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
      input.addEventListener('click', handleOptionClick);
      optionsEl.appendChild(input);
      optionsEl.appendChild(label);
    }
  }
}

let selectedOption;

function handleOptionClick(event) {
  // Get the selected option
  selectedOption = event.target.textContent;
  nextButton.disabled = false;

  // Update the answers array with the selected option
  // answers.push(selectedOption);
}

function createColoredSquare(color) {
  const square = document.createElement('div');
  square.style.backgroundColor = color;
  square.style.width = '10%';
  square.style.height = '10%';
  square.style.padding = '10px';
  square.style.cursor = 'pointer';
  square.addEventListener('click', () => {
    selectedOption = square.style.backgroundColor;
    nextButton.disabled = false;
    console.log(selectedOption);
  });
  return square;
}

function handleNextButtonClick() {
  // Check if an option has been selected
  if (selectedOption) {
    // Increase the current question index
    currentQuestionIndex++;

    // If we have reached the end of the questions, reset to the beginning
    if (currentQuestionIndex >= questions.length) {
      currentQuestionIndex = 0;
    }

    // Update the question and options
    updateQuestion();
    const lineWidth =
      ((currentQuestionIndex + 1) / (questions.length - 1)) * 100;
    line.style.width = `${lineWidth}%`;
    answers.push(selectedOption);
    selectedOption = null;

    // Disable the "Next" button again
    nextButton.disabled = true;
  }
}

// Function to handle the submit button click
function handleSubmitButtonClick() {
  // Log the current list of answers to the console
  console.log('Answers:', answers);
}

// Add event listeners to the next and submit buttons
nextButton.addEventListener('click', handleNextButtonClick);
nextButton.addEventListener('click', handleSubmitButtonClick);

// Update the initial question and options
updateQuestion();
